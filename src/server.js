import User from './models/User.model.js'
import database from './config/db.js'
import express from 'express';
import generalRouter from './routes/generalRoutes.js'
import helmet from 'helmet';
import morgan from "morgan";
import path from 'path'
import propertyRoutes from './routes/propertyRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();

try {
    await database.authenticate();
    console.log(" ------------------ \n   Connection to MySQL was accepted \n ------------------");

    await database.sync();
    console.log(" ------------------ \n   Synchronization with MySQL finished \n ------------------");
} catch (err) {
    console.log(err);
}

//Settings
app.set('PORT', process.env.PORT || 3000)
// View Engine
app.set('view engine', 'pug');
app.set("views", "./src/views")
// urlencoded
app.use(express.urlencoded({ extended: true }))

//cokie-parser
app.use(cookieParser());
// morgan - logger
app.use(morgan('dev'));
// Helmet
app.use(helmet())
// Public
app.use(express.static('./src/public'));


//Middelwares
// app.use(json());
app.use('/api/bienes-raices-220138', generalRouter);
app.use('/bienes-raices/users', userRoutes);
//app.use('/login', userRoutes);
app.use('/bienes-raices/propertys', propertyRoutes);




app.listen(3000, () => {
    console.log(`Server listening on port ${3000} \n URL: http://localhost:3000/api/bienes-raices-220138`);
})
export default app;