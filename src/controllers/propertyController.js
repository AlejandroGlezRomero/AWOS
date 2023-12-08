// propertyController.js
import { request, response } from 'express';
import category from '../models/category.js';
import Category from '../models/category.js';
import Price from '../models/Price.js';
import Property from "../models/Property.js";   

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

const findAllByUserProperty = (request, response) => {
    return 0;
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
    console.log('Validar y guardar datos en la Bd de datos');

    const { title, description, nRooms, nParkinlots, nWC, priceRange, category, street, lat, lng } = request.body;
    console.log(request.body);

    try {
        const loggedUser = request.User.id; // Use request.User instead of request.user
        console.log(loggedUser);

        if (loggedUser) {
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

            response.redirect(`./create/addImage/${savedProperty.id}`);
        }
    } catch (error) {
        console.error(error);
        return response.clearCookie('_token').redirect("/login");
    }
}


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
