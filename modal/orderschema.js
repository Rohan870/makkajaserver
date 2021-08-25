const mongoose = require("mongoose");

const Orders = mongoose.Schema({
    activeproducts: [
        {
            productId: {
                type: String,
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            price: {
                type: Array,
            },
            image: {
                type: String,
            },
            category: {
                type: String,
            },
            weight: {
                type: String,
            },
            dimensions: {
                type: String,
            },
            
            date:{
                type:String
            },
        },
    ],
    ordered: [
        {
            productId: {
                type: String,
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            price: {
                type: Array,
            },
            image: {
                type: String,
            },
            category: {
                type: String,
            },
            weight: {
                type: String,
            },
            dimensions: {
                type: String,
            },
            date:{
                type:String
            },
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});
const model = mongoose.model("Orders", Orders);
module.exports = model;
