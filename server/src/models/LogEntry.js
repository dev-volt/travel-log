const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
}
const requiredNumbser = {
    type: Number,
    required: true
}

const logEntrySchema = new Schema({
    title: requiredString, // String is shorthand for {type: String}
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 0
    },
    visitDate: {
        type: Date,
        required: true
    },
    latitude: {
        ...requiredNumbser,
        min: -90,
        max: 90
    },
    longitude: {
        ...requiredNumbser,
        min: -180,
        max: 180
    },
}, {
    timestamps: true
});

const logEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = logEntry;