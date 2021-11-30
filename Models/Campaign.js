const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    head: {
        type: String,
        required: true
    },
    date_start: {
        type: Date,
        default: Date.now
    },
    date_end: {
        type: Date,
        default: Date.now
    },
    volunteers: {
        type: Array,
        unique: true
    },
    progress: {
        type: Number,
        default: 0
    },


});

module.exports = mongoose.model("campaigns", CampaignSchema);