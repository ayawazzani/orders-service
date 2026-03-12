const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  CustomerID:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },

  BookID:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },

  initialDate:{
    type:Date,
    required:true
  },

  deliveryDate:{
    type:Date,
    required:true
  }

});

mongoose.model("Order",OrderSchema);