const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mogoose=require('mongoose');

const app = express();

const adminRoutes = require('./routes/admin_route');

const User=require('./models/user');

const cors=require('cors');
app.use(bodyParser.json({ extended: false }));


app.use(cors());
app.use('/admin', adminRoutes);

mogoose.connect('mongodb+srv://Harsh:Harsh1005@cluster0.bubrebl.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{ 
  app.listen(3000);
}).catch(err=>console.log(err));

