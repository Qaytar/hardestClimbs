const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClimberSchema = new Schema({
    name: String,
    gender: {
        type: String,
        enum: ['man', 'woman']
    },
    sends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Send'
        }
    ]
});

module.exports = mongoose.model('Climber', ClimberSchema);