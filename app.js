require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const mongoStr = process.env.DATABASE_URL;


const Video = require('./controller/videoController');
const Product = require('./controller/productController');

// SWAGGER
// const swaggerUI = require('swagger-ui-express');
// const apiDocumentation = require('./apidocs.json');
// app.use('video-api-docs', swaggerUI.serve, swaggerUI.setup(apiDocumentation)); 
// ENDSWAGGER

mongoose.connect(mongoStr);

const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', ()=> {
    console.log('Database Connected')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/video', Video)

app.use('/product', Product);



app.listen(PORT, ()=>{
    console.log(`This Server running on port ${PORT}`);
});
