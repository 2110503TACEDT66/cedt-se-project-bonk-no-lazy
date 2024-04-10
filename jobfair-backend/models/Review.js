const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: null,
        required: false,
        set:(val) => parseFloat(val.toFixed(2))
    },
    comment: {
        type:String,
        required: false,
        default: null
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:true
    }});

    module.exports = mongoose.model('Review',ReviewSchema);