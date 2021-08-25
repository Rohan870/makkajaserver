const mongoose = require("mongoose");

const address = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname:{
        type: String
    },
    address:{
        type:String
    },
    appartment:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    pin:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },

  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});
const model = mongoose.model("Address", address);
module.exports = model;
