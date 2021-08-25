const mongoose = require('mongoose');


const med_category = mongoose.Schema({
    category: {
        type: String,
        unique: [true, "category alredy present"]
    }
})

const model = mongoose.model('Med_category', med_category);

module.exports = model;