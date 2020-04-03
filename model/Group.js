const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    students: [Schema.Types.ObjectId],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Group', groupSchema);
