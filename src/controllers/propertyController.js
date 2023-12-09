// propertyController.js
import { request, response } from 'express';
import category from '../models/category.js';
import Category from '../models/category.js';
import Price from '../models/Price.js';
import Property from "../models/Property.js";   
import { validationResult, check } from 'express-validator';


const insertProperty = (request, response) => {
    return 0;
}

const updateProperty = (request, response) => {
    return 0;
}

const deleteProperty = (request, response) => {
    return 0;
}

const findAllProperty = (request, response) => {
    return 0;
}

const findAllByUserProperty = async (req, res) => {
    try {
        const userId = req.User.id;
        const properties = await Property.findAll({ where: { user_ID: userId } });

        res.render('home', { properties, page: 'Home' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar las propiedades del usuario');
    }
}

const findOneProperty = (request, response) => {
    return 0;
}




const formProperty = async (request, response) => {
    console.log("Mostrando el formulario para la creación de una nueva Propiedad");
    console.log(request.body);

    const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()])
    response.render("property/create", {
        page: "New Property",
        showHeader: true,
        data: request.body,
        categories,
        prices
    });
}

const saveProperty = async (request, response) => {
    console.log('Validar y guardar datos en la BD de datos');

    const { title, description, nRooms, nParkinlots, nWC, priceRange, category, street, lat, lng } = request.body;
    console.log(request.body);

    // Define las reglas de validación usando check
    const validationRules = [
        check('title').notEmpty().withMessage('The title is required').isLength({ min: 15, max: 150 }).withMessage('The title property must have between 15 and 150 characters'),
        check('description').notEmpty().withMessage('The description is required'),
        check('category').notEmpty().withMessage('All properties must be categorized').isInt({ min: 1, max: 5 }).withMessage('The category is unknown'),
        check('priceRange').notEmpty().withMessage('All properties must have a price').isInt({ min: 1, max: 8 }).withMessage('The price is unknown'),
        check('nRooms').isInt({ min: 0, max: 10 }).withMessage('The number of rooms is unknown'),
        check('nWC').isInt({ min: 0, max: 5 }).withMessage('The number of wc is unknown'),
        check('nParkinlots').isInt({ min: 0, max: 5 }).withMessage('The number of parking lot is unknow'),
        check('street').notEmpty().withMessage('The name of the street is unknow'),
        check('lat').isFloat({ min: -90, max: 90 }).withMessage('The latitude is not in the requested range'),
        check('lng').isFloat({ min: -180, max: 180 }).withMessage('The longitude is not within the requested range.'),
    ];

    // Aplica las reglas de validación a la solicitud
    await Promise.all(validationRules.map(validation => validation.run(request)));

    // Obtiene los errores de validación
    const errors = validationResult(request);

    try {
        const loggedUser = request.User.id;

        if (loggedUser) {
            if (!errors.isEmpty()) {
                // Si hay errores de validación, renderiza el formulario nuevamente con los errores.
                const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()]);
                return response.render('property/create', {
                    page: 'New Property',
                    showHeader: true,
                    data: request.body,
                    categories,
                    prices,
                    errors: errors.array(),
                });
            }

            // Si no hay errores, guarda la propiedad en la base de datos.
            const savedProperty = await Property.create({
                title,
                description,
                nRooms,
                nParkinlots,
                nWC,
                price_ID: priceRange,
                category_ID: category,
                address: street,
                lat,
                lng,
                user_ID: loggedUser,
            });

            // Termina la ejecución después de redirigir
            return response.redirect(`./create/addImage/${savedProperty.id}`);
        }
    } catch (error) {
        console.error(error);
        return response.clearCookie('_token').redirect('/login');
    }
};



const formAddImage = async (req, res) => {
    console.log(`Visualizar el formulario para agregar imagenes`)

    const { idProperty } = req.params
    console.log(idProperty)
    //const userID = req.user.id
    const property = await Property.findByPk(idProperty);
    if (!property) {
        return res.redirect('/home')
    }
    if (property.published) {
        return res.redirect('/home')
    }
    if (req.User.id.toString() !== property.user_ID.toString()) {
        return res.redirect('/home')
    }

    res.render('property/addImage', {
        property,
        page: `Add image to ${property.title}`,
        idProperty
    })


}

const loadImage = async (req, res, next) => {
    console.log(`Visualizar el formulario para agregar imagenes`)

    const { idProperty } = req.params
    console.log(idProperty)
    //const userID = req.user.id
    const property = await Property.findByPk(idProperty);
    if (!property) {
        return res.redirect('/home')
    }
    if (property.published) {
        return res.redirect('/home')
    }
    if (req.User.id.toString() !== property.user_ID.toString()) {
        return res.redirect('/home')
    }

    try {
//ALMACENAR LA BASE Y PUBLICAR 
        console.log(req.file);
        property.image = req.file.filename;
        property.published = 1;

        await property.save();

        next();
    } catch (err) {
        console.log(err)
    }
}



export {
    insertProperty,
    updateProperty,
    deleteProperty,
    findAllProperty,
    findAllByUserProperty,
    findOneProperty,
    formProperty,
    saveProperty,
    formAddImage,
    loadImage
};
