var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')
var multer = require('multer');
var upload = multer();
var path = require ('path');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array());
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://newUser:brave123@ds259105.mlab.com:59105/heroku_6rdr5zwb';


//LOAD the various controllers
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Orders collection

router.post('/storeData', controllerMongoCollection.storeData);


module.exports = router;
