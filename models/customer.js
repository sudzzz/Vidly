const mongoose = require('mongoose');
const Joi = require('joi');
const Customer = new mongoose.model('Customer',new mongoose.Schema({
    isGold : {type : Boolean, required : true, default:false},
    name : {type : String, required : true,minlength:3,maxlength:50},
    phone : {type : String, required : true, min:5,max:10}
}));

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
