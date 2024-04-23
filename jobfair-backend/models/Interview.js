const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    interviewDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Interview', InterviewSchema);