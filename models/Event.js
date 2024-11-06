const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    theme: { type: String, required: true },
    image_url: { type: String },
    price: { type: Number, required: true },
    event_date: { type: Date, required: true },
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
