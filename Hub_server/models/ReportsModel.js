const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    file: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

})


const report = mongoose.model('report', reportSchema);

module.exports = report;