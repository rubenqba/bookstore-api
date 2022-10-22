const { ShoppingCartModel } = require("../models");

const _getUserPendingCart = (user_id) => ShoppingCartModel.findOne({ owner: user_id, status: "pending" });
const _createUserCart = (user_id) => ShoppingCartModel.create({ owner: user_id, total: 0.0 });
const _closeCart = (cart_id) => ShoppingCartModel.findByIdAndUpdate({ _id: cart_id, status: "pending" }, { status: "completed" }, { new: true });

class CartService {

    getUserCurrentCart = async (user_id) => {
        let cart = await _getUserPendingCart(user_id);
        if (!cart) {
            cart = await _createUserCart(user_id);
        }
        return cart; 
    };

    closeCart = async (user_id) => {
        const cart = await _getUserPendingCart(user_id);
        if (!cart) {
            throw Error("Current user have no active shopping cart");
        }
        cart.status = "completed";
        return cart.save();
    };

    updateBook = async (user_id, book) => {
        const cart = await _getUserPendingCart(user_id);
        if (!cart) {
            throw Error("Current user have no active shopping cart");
        }

        const current = cart.get('products');

        const ids = new Set(current.map(b => b.product));

        let books = [];
        if (ids.has(book.product)) {
            books = current.map(b => {
                if(book.product === b.product) {
                    b.qty = book.qty;
                }
                return b;
            });
        } else {
            books = current.concat([book]);
        }
        
        cart.products = books;
        return cart.save();
    };

    removeBookFromCart = async (user_id, book_id) => {
        const cart = await _getUserPendingCart(user_id);
        if (!cart) {
            throw Error("Current user have no active shopping cart");
        }

        const books = cart.get('products').filter(b => b.product !== book_id);        
        cart.products = books;
        return cart.save();
    };
}

module.exports = new CartService();