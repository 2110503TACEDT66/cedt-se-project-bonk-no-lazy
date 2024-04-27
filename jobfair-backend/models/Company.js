const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
});

//Reverse populate with virtuals
CompanySchema.virtual('interviews', {
    ref: 'Interview',
    localField: '_id',
    foreignField: 'companyId',
    justOne: false
});

CompanySchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'companyId',
    justOne: false
});

//Cascade delete interviews when a company is deleted
CompanySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`Interview sessions being removed from Company ${this._id}`);
    await this.model('Interview').deleteMany({companyId: this._id});
    next();
})

CompanySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`All reviews associated with company ${this.name} (id: ${this._id}) are being removed`);
    await this.model('Review').deleteMany({companyId: this._id});
    next();
})

module.exports = mongoose.model('Company', CompanySchema, 'Company');