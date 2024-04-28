const { Schema, Types, model } = require("mongoose");
const dataFormat = require("../utils/dateFormat");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minlength: 1,
            maxlength: 280,
            required: "The Text to display",
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dataFormat(createdAtVal),
        },

        username: {
            type: String,
            required: "Username is needed",
        },

        reactions: [ReactionSchema],


    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: fal
    });

ThoughtSchema.virtual("reactionCount").get(function () {
    console.log("reaction", this.reactions)
    return this.reactions.leghth;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
