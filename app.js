const express = require('express')
const connectdb = require('./database/connectdb')
const cors = require('cors');

const app = express()                 
app.use(express.json())
app.use(cors())

const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary');
const fileUpload = require("express-fileupload");
const web = require('./routes/web')   
     

app.use(fileUpload({useTempFiles: true}));
app.use(cookieParser())
app.use('/api/ns', web);
connectdb();


module.exports = app