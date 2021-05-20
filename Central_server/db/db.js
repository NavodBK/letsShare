const mongoose = require('mongoose');

try {
    // dbCon = mongoose.connect('mongodb://localhost:27017/letsShare-central',{useNewUrlParser:true,useUnifiedTopology:true});
    dbCon = mongoose.connect("mongodb+srv://admin:Toshiba-@cluster0.8bfo4.mongodb.net/letsShare?retryWrites=true&w=majority")
} catch (error) {
    console.log(error)
}


module.exports = dbCon;