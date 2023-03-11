import mongoose from 'mongoose';
import validator from 'validator';
import encrypt from 'mongoose-encryption';

import * as dotenv from 'dotenv'
dotenv.config()

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"],
        lowercase: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Email is invaid");
            }
        },
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        maxlength: 10,
        minlength: 5,
        trim: true
    },
    referralCode: {
        type: String,
        unique: true,
        required: true,
        default: () => Math.random().toString(36).substring(2, 8)
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    referredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    points: {
        type: Number,
        default: 0
    }
});

var encKey = process.env.ENC_KEY;
var sigKey = process.env.SIG_KEY;

userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['password'] });

// module.exports = mongoose.model('User', userSchema);

// compile schema to model
const UserSchemaModel = mongoose.model('User', userSchema);

export default UserSchemaModel;
