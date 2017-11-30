var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')
var multer = multer();
var path = require ('path');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://newUser:brave123@ds259105.mlab.com:59105/heroku_6rdr5zwb';


//LOAD the various controllers
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Orders collection

router.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of orders
        var Orders = db.collection('Orders');

        //get all Orders
        Orders.find({ }).sort({ name: 1 }).toArray(function (err, docs) {

            if(err) throw err;

            response.render('/getAllOrders', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });

    });//end of connect

});//end router.get

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

router.post('/storeData', controllerMongoCollection.storeData);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
