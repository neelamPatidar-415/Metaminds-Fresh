const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    message: {
    type: String,
    required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
})

module.exports = mongoose.model("feedback", FeedbackSchema);