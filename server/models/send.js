const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SendSchema = new Schema({
    climber: {
        type: Schema.Types.ObjectId,
        ref: 'Climber'
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: 'Route'
    },
    date: Date
});

module.exports = mongoose.model('Send', SendSchema);