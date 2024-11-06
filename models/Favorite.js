const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    favorite_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    favorite_event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, 
    added_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
