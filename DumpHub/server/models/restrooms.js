const mongoose = require("mongoose");
const { Schema } = mongoose;

const restroomSchema = new Schema (
    {
        X: {
            type: String,
            required: true,
        },
        Y: {
            type: String,
            required: true,
        },
        amenity: {
            type: String, 
            required: false,
        },
        disposal: {
            type: String, 
            required: false,
        },
        access: {
            type: String,
            required: false,
        },
        fee: {
            type: String,
            required: false,
        },
        unisex: {
            type: String,
            required: false,
        },
        operator: {
            type: String, 
            required: false,
        },
        wheelchair: {
            type: String, 
            required: false,
        },
        diaper: {
            type: String, 
            required: false,
        },
        drinking_water: {
            type: String, 
            required: false,
        },
        name: {
            type: String, 
            required: false,
        },
        position: {
            type: String, 
            required: false,
        },
        description: {
            type: String, 
            required: false,
        },
        indoor: {
            type: String,
            required: false,
        },
        paper_supplied: {
            type: String,
            required: false,
        },
        opening_hours: {
            type: String, 
            required: false,
        },
        soap: {
            type: String, 
            required: false,
        },
        handwashing: {
            type: String, 
            required: false,
        },
        capacity: {
            type: String, 
            required: false,
        },
        shower: {
            type: String, 
            required: false,
        },
        supervised: {
            type: String, 
            required: false,
        },
        hand_drying: {
            type: String, 
            required: false,
        },
    },
    { collection: 'restroom' }
);

module.exports = mongoose.model("Restrooms", restroomSchema)
