//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const Photo=require('../models/photoModel');
const photoController = require('../controllers/photoController');
const { request } = require('express');

router.post('/',photoController.createPhoto) // good 
router.get('/:photoID',photoController.getPhoto); //good 
router.get('/',photoController.getAllPhotos);//good 
router.put('/edit/:photoID',photoController.editPhoto);
router.delete('/', photoController.deletePhoto); 
router.get('/scrape',photoController.scrapePhoto); //good 


module.exports=router; 