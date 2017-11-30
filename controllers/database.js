var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://newUser:brave123@ds259105.mlab.com:59105/heroku_6rdr5zwb';
var bodyParser = require('body-parser');
var path = require('path');
var querystring = require('querystring');
var multer = require('multer');
var upload = multer();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


module.exports.storeData = function(req, response){
    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var datetime = new Date();
        var prodVect = [];
        var totalCost = 0;

        var customerdata = {
            _id: customerID,
            FIRSTNAME: req.body.user.firstName,
            LASTNAME: req.body.user.lastName,
            STREET: req.body.user.street,
            CITY: req.body.user.city,
            STATE: req.body.user.state,
            ZIP: req.body.user.zip,
            PHONE: req.body.user.phone
        };

        db.collection('Customers').insertOne(customerdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });

        var billingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            BILLING_CITY: req.body.user.billCity,
            BILLING_STATE: req.body.user.billState,
            BILLING_STREET: req.body.user.billStreet,
            BILLING_ZIP: req.body.user.billZip
        };

        db.collection('Billing').insertOne(billingdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });

        var shippingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: req.body.user.street,
            SHIPPING_CITY: req.body.user.city,
            SHIPPING_STATE: req.body.user.state,
            SHIPPING_ZIP: req.body.user.zip
        };

        db.collection('Shipping').insertOne(shippingdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });

        var orderdata = {
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: datetime,
            PRODUCT_VECTOR: prodVect,
            ORDER_TOTAL: totalCost
        };

        db.collection('Orders').insertOne(orderdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });

        res.render('orders');
    });//end of connect
};