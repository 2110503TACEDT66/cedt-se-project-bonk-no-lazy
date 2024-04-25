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
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
}, {
    timestamps: true,
});

    module.exports = mongoose.model('Review', ReviewSchema, 'Review');