const mongoose = require("mongoose");
const { ShoppingCartSchema } = require("./shopping_cart");

module.exports = {
    ShoppingCartModel: mongoose.model('shopping_cart', ShoppingCartSchema)
}