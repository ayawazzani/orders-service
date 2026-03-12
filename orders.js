const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const {ObjectId} = require("mongodb");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require("./Order");
const Order = mongoose.model("Order");

const uri = "mongodb+srv://aya:aya123@cluster0.t6s6wt8.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log(err));


// HOME
app.get("/",(req,res)=>{
    res.send("Welcome to orders service !!!");
});


// ADD ORDER
app.post("/order",(req,res)=>{

    const newOrder = {

        CustomerID:new ObjectId(req.body.CustomerID),
        BookID:new ObjectId(req.body.BookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    };

    const order = new Order(newOrder);

    order.save()
    .then(()=>{
        res.json({message:"a new order added !!!"});
    });

});


// GET ORDERS
app.get("/orders",(req,res)=>{

    Order.find()
    .then(orders=>{
        res.json({orders});
    });

});


// GET ORDER + MICROservices
app.get("/order/:id",(req,res)=>{

Order.findById(req.params.id)

.then(order=>{

axios.get("http://customers-service-pearl.vercel.app/customers/"+order.CustomerID)

.then(customer=>{

axios.get("books-service.vercel.app/books/"+order.BookID)

.then(book=>{

res.json({

order:{
customerName:customer.data.customer.name,
bookTitle:book.data.book.title,
initialDate:order.initialDate,
deliveryDate:order.deliveryDate
}

});

});

});

});

});


app.listen(6666,()=>{
console.log("Up and running! -- This is our orders service");
});