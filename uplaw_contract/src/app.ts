const express = require('express');
import  {join } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

//setup mongodb
import db from './config/mongo';
db();

// main router app
import mainRouter from './router/mainContractRouter';


// setup  environment variable
dotenv.config({ path: join(__dirname, '../../uplaw_contract/.env') });
export const PORT = process.env.PORT;

//setup Express
export const app = express();



// middleware
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// path for uploadImage employee
app.use('/image', express.static(join(__dirname, 'image')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', join(__dirname,'./views/contract.ejs'));

// main router
app.use('/api/v1', mainRouter);

// SETUP Application
app.listen(PORT, ()=> {
    console.log(`running application on port ${PORT}`)
})