

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/'));

mongoose.connect('mongodb://localhost:27017/agri', {useNewUrlParser: true});
var conn = mongoose.connection;
const random = () => Math.floor(Math.random() * 100) + 1;
const predpr = random();

const random2 = () => Math.floor(Math.random() * 150) + 1;
const predpr2 = random2();

//creating a dta schema and model

const agrischema = {
    farmerid: String,
    farmername: String,
    location: String,
    corpname: String,
    phone: String,
    quantity: String,
    status: String,
    orders: String,
    funds: String,
    required: String,
    distributorid: String,
    rxprctedprice: String
}

const agriconn = mongoose.model("agridb", agrischema); 


app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
    // res.sendFile('./index.html', {root: _dirname});
})

// app.get("/quality", function(req, res) {

//     res.sendFile(__dirname + "/quality.html");
//     // res.sendFile('./booking.html', {root: _dirname});
// })

// app.get("/customer", function(req, res) {

//     res.sendFile(__dirname + "/customer.html");
//     // res.sendFile('./booking.html', {root: _dirname});
// })

// app.get("/finance", function(req, res) {

//     res.sendFile(__dirname + "/finance.html");
//     // res.sendFile('./booking.html', {root: _dirname});
// })


const agrifetchsch = {
    farmerid: String,
    farmername: String,
    location: String,
    corpname: String,
    phone: String,
    quantity: String,
    status: String,
    orders: String,
    funds: String,
    required: String,
    distributorid: String,
    rxprctedprice: String
}
// const agridetails = mongoose.model('agridb', agrifetchsch);


app.get("/quality", function(req, res) {
    agriconn.find({}, function(err, agridb){
        res.render('quality', {
            agrilist: agridb

        })
        
    })
   
})

app.get("/finance", function(req, res) {
    agriconn.find({}, function(err, agridb){
        res.render('finance', {
            agrilist: agridb

        })
        
    })
   
})

app.get("/customer", function(req, res) {
    agriconn.find({}, function(err, agridb){
        res.render('customer', {
            agrilist: agridb

        })
        
    })
   
})

app.get("/distributor", function(req, res) {
    agriconn.find({}, function(err, agridb){
        res.render('distributor', {
            agrilist: agridb

        })
        
    })
   
})

app.get("/farmers", function(req, res) {
    agriconn.find({}, function(err, agridb){
        res.render('farmerdetails', {
            agrilist: agridb

        })
        
    })
   
})


//writing the postrequest listener
app.post("/", function(req, res){
    let newNote = new agriconn({
        farmerid: req.body.farmerid,
        farmername: req.body.farmername,
        location: req.body.location,
        corpname: req.body.corpname,
        phone: req.body.phone,
        quantity: req.body.quantity,
        required: predpr,
        distributorid: predpr2,
        rxprctedprice: req.body.rxprctedprice,
        status: 'Waiting' 
    });
    newNote.save();
    res.redirect('/');
})




app.post("/update", function(req, res){

    var _id = req.body.id;
    console.log(_id); 
    agriconn.findByIdAndUpdate(_id, { status: 'Approved' },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated status : ", docs);
    }
});
    res.redirect('/quality');
})


app.post("/purchase", function(req, res){

    var _id = req.body.id;
    var order = req.body.order;
    console.log(_id); 
    agriconn.findByIdAndUpdate(_id, { orders: order },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated status : ", docs);
    }
});
    res.redirect('/customer');
})

app.post("/distr", function(req, res){

    var _id = req.body.id;
    var dist = req.body.dist;
    console.log(_id); 
    agriconn.findByIdAndUpdate(_id, { distributorid: dist },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated status : ", docs);
    }
});
    res.redirect('/distributor');
})


app.post("/fund", function(req, res){

    var _id = req.body.id;
    var fund = req.body.fund;
    console.log(_id); 
    agriconn.findByIdAndUpdate(_id, { funds: fund },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated status : ", docs);
    }
});
    res.redirect('/finance');
})


//app frontend

app.listen(3000, function() {
    console.log("Server is up on 3000")
})