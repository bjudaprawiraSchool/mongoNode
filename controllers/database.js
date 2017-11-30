var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://newUser:brave123@ds259105.mlab.com:59105/heroku_6rdr5zwb';
var bodyParser = require('body-parser');
var path = require ('path');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of orders
        var Orders = db.collection('Orders');


        //FIRST showing you one way of making request for ALL orders and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Orders.find({});

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Orders  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllOrders.ejs view for use there
        Orders.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Orders where frequency>=10 and sorts by name
        // Orders.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Orders by name
        //  Orders.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function

module.exports.storeData = function(request, response){
    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        /**************************************************************************
         * IMPORTANT:  this is how you generate  a random number for  3IDs that
         * you will need for the collections cusomerID, billinID and   shippingID
         *    WHY?  the retrieve _id  info after and  insert (see below)  does not seem
         *     to function properly on Heroku
         *    so to know the ID we simply generate it in code  rather than
         *     autogenerate it for the documents we newly insert into the CUSOTMERS, BILLING, SHIPPING
         *      for ORDERS we allow the system to autogenerate its  _id
         */
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var datetime = new Date();
        var prodVect = [];
        var totalCost = 0;

        var customerdata = {
            _id: customerID,
            FIRSTNAME: req.body.user.FIRSTNAME,
            LASTNAME: null,
            STREET: req.body.user.STREET,
            CITY: req.body.user.CITY,
            STATE: req.body.user.STATE,
            ZIP: req.body.user.ZIP,
            PHONE: null
        };

        var billingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            BILLING_CITY: shipment_info['city'],
            BILLING_STATE: shipment_info['state'],
            BILLING_STREET: shipment_infos['add1'] + ' ' + shipment_info['add2'],
            BILLING_ZIP: shipment_info['zipcode']
        };

        var shippingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: shipment_info['add1'] + ' ' + shipment_info['add2'],
            SHIPPING_CITY: shipment_info['city'],
            SHIPPING_STATE: shipment_info['state'],
            SHIPPING_ZIP: shipment_info['zipcode']
        };

        var orderdata = {
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: datetime,
            PRODUCT_VECTOR: prodVect,
            ORDER_TOTAL: totalCost
        };



        db.collection('Customers').insertOne(customerdata, function(err, res){
           if (err) throw err;
           console.log("1 document inserted");
        });

        db.collection('Shipping').insertOne(shippingdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });

        db.collection('Billing').insertOne(billingdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });

        db.collection('Orders').insertOne(orderdata, function(err, res){
            if (err) throw err;
            console.log("1 document inserted");
        });

        //FIRST showing you one way of making request for ALL orders and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Orders.find({});

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Orders  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllOrders.ejs view for use there
        Orders.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Orders where frequency>=10 and sorts by name
        // Orders.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Orders by name
        //  Orders.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};