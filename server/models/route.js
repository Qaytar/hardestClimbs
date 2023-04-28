const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    name: String,
    location: String,
    country: String,
    note: String,
    discipline: {
        type: String,
        enum: ['boulder', 'sport']
    },
    europeanGrade: String,
    americanGrade: String
});

module.exports = mongoose.model('Route', RouteSchema);