const cart_service = require("../services/cart_service");
const Validators = require("./validators");

exports.get_cart = (req, res) => {
    const user_id = req.kauth.grant.access_token.content.sub;
    console.log(JSON.stringify({user: user_id, ops: 'get current cart'}, null, 2));

    cart_service.getUserCurrentCart(user_id)
        .then(cart => res.status(200).json(cart.toObject()))
        .catch(err => {
            if (err.message === 'cart_not_found') {
                res.status(404).json({
                    user: user_id,
                    message: 'current user does not have an active shopping cart'
                });
            } else {
                console.error(`error getting user ${user_id} cart`, err);
                res.status(500).send(err.message);
            }
        });
}

exports.close_cart = (req, res) => {
    const user_id = req.kauth.grant.access_token.content.sub;
    console.log(JSON.stringify({ user: user_id, ops: 'close current cart' }, null, 2));

    cart_service.closeCart(user_id).then(c => res.status(202).json(c.toObject()))
        .catch(err => {
            if (err.message === 'cart_not_found') {
                res.status(404).json({
                    user: user_id,
                    message: 'current user does not have an active shopping cart'
                });
            } else {
                console.error(`error getting user ${user_id} cart`, err);
                res.status(500).send(err.message);
            }
        });
}

exports.add_book = (req, res) => {
    const user_id = req.kauth.grant.access_token.content.sub;
    const { value, error } = Validators.validateBook(req.body);
    console.log(JSON.stringify({ user: user_id, ops: 'add book', has_error: error != undefined, message: error && error.message }, null, 2));

    if (error) {
        res.status(412).json({ user: user_id, message: error.message });
    } else {
        cart_service.updateBook(user_id, value)
            .then(c => res.status(202).json(c.toObject()))
            .catch(err => {
                if (err.message === 'cart_not_found') {
                    res.status(404).json({
                        user: user_id,
                        message: 'current user does not have an active shopping cart'
                    });
                } else {
                    console.error(`error getting user ${user_id} cart`, err);
                    res.status(500).send(err.message);
                }
            });
    }
}

exports.remove_book = (req, res) => {
    const user_id = req.kauth.grant.access_token.content.sub;
    const book_id = req.params.book;
    console.log(JSON.stringify({ user: user_id, ops: 'remove book', book_id }, null, 2));

    cart_service.removeBookFromCart(user_id, book_id)
        .then(c => res.status(202).json(c.toObject()))
        .catch(err => {
            if (err.message === 'cart_not_found') {
                res.status(404).json({
                    user: user_id,
                    message: 'current user does not have an active shopping cart'
                });
            } else {
                console.error(`error getting user ${user_id} cart`, err);
                res.status(500).send(err.message);
            }
        });
}

