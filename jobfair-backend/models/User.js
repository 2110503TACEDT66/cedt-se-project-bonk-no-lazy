const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    emailVerified:{
        type: Date
    },
    image:{
        type: String,
    },
    hashedPassword:{
        type: String,
        select: false,
    },
    favouriteIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }],
    tel:{
        type: String,
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN', 'COMPANY'],
        default: 'USER'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    companyId:{
        type: String,
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
});

UserSchema.virtual('accounts', {
    ref: 'Account',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});

UserSchema.virtual('companies', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});

UserSchema.virtual('interviews', {
    ref: 'Interview',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});

UserSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//Match user entered password to hashed password in db
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.hashedPassword);
}

UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`All accounts associated with user ${this.name} (id: ${this._id}) are being removed`);
    await this.model('Account').deleteMany({userId: this._id});
    next();
})

UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`All companies associated with user ${this.name} (id: ${this._id}) are being removed`);
    await this.model('Company').deleteMany({userId: this._id});
    next();
})

UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`All interviews associated with user ${this.name} (id: ${this._id}) are being removed`);
    await this.model('Interview').deleteMany({userId: this._id});
    next();
})

UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    console.log(`All reviews associated with user ${this.name} (id: ${this._id}) are being removed`);
    await this.model('Review').deleteMany({userId: this._id});
    next();
})

module.exports = mongoose.model('User', UserSchema, 'User');