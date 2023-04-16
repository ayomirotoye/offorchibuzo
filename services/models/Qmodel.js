const mongoose = require('mongoose');

const QSchema = new mongoose.Schema({
    queue: {
        type: [String],
        required: true
    }
}, {timestamp: true});

const QModel = mongoose.model('Q', QSchema);

module.exports = QModel;