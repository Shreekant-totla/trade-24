const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
     name: String,
     email: String,
     password: String,
     city: String,
     DOB: String,
     addToCart: Array,
     purchasedStock: Array,
     portfolio: Array
}, {
    versionKey : false
});


const userModel = mongoose.model("users", userSchema);


module.exports = {
    userModel
}