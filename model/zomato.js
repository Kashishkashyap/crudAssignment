const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ZomatoSchema = new Schema({
    restaurant: String,
    name: String,
    image: String, 
    discount: String,
    description: String,
    price: Number,
    time: String,
    
});
module.exports= mongoose.model('Zomato', ZomatoSchema);
