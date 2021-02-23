const mongoose = require('mongoose');

try {
    dbCon = mongoose.connect('mongodb://localhost:27017/letsShare-central',{useNewUrlParser:true,useUnifiedTopology:true});
} catch (error) {
    console.log(error)
}


module.exports = dbCon;