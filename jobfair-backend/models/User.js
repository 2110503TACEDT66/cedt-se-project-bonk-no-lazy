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
    profile_picture:{
        type: String,
    },
    password:{
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
        enum: ['user', 'admin', 'company'],
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    companyID:{
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
    this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//Match user entered password to hashed password in db
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
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

module.exports = mongoose.model('User', UserSchema);