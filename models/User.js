const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            unique: true,
            trim: true,
            requiree: "username is required"
        },

        email:
        {
            type: String,
            unique: true,
            required: "email is required",
            math: [/.+@.+..+/, "Enter your email address"]
        },

        thoughts:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        userCreated:
        {
            type: Date,
            default: Date.now,
            get:userCreatedVal => dateFormat(userCreatedVal)
        },

    },
    {
        toJSON:
        {
            virtuals: true,
            getters: true},
            id: false
        },
    
);

const User = model('User', userSchema);

module.exports = User;
