import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

const port = process.env.PORT || 2500 ;

import connectDB from './Config/db.js'

import bodyParser from 'body-parser';

import cors from 'cors' ;

import authRouter from './Routes/authRouter.js';

import productRouter from './Routes/productRouter.js';

app.get('/' , (req , res) =>{
    res.send('Authentication');
})

connectDB();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/auth' , authRouter);

app.use('/api/products' , productRouter);

app.listen(port , ()=>{
    console.log(`App is strting.... ${port}`)
})
