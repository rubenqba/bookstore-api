const cart_service = require("../services/cart_service");
const Validators = require("./validators");



exports.get_cart = (req, res) => {
    console.log(`user_id: ${req.kauth.grant.access_token.content.sub}`)
    const user_id = req.kauth.grant.access_token.content.sub;

    cart_service.getUserCurrentCart(user_id)
        .then(cart => res.status(200).json(cart.toObject()))
        .catch(err => {
            console.error(`error getting user ${user_id} cart`, err);
            res.status(500).send(err.message);
        });
}

exports.close_cart = (req, res) => {
    console.log(`user_id: ${req.kauth.grant.access_token.content.sub}`)
    const user_id = req.kauth.grant.access_token.content.sub;

    cart_service.closeCart(user_id).then(c => res.status(202).json(c.toObject()))
        .catch(err => {
            console.error(`error getting user ${user_id} cart`, err);
            res.status(500).send(err.message);
        });
}

exports.add_book = (req, res) => {
    console.log(`user_id: ${req.kauth.grant.access_token.content.sub}`)
    const user_id = req.kauth.grant.access_token.content.sub;

    const {value, error} = Validators.validateBook(req.body);

    if(error) {
        res.status(400).json({message: error.description});
    }
    
    cart_service.updateBook(user_id, value)
        .then(c => res.status(202).json(c.toObject()))
        .catch(err => {
            console.error(`error getting user ${user_id} cart`, err);
            res.status(500).send(err.message);
        });    
}

exports.remove_book = (req, res) => {
    const user_id = "3bf6e21a-36c7-4d3e-9199-4047e949e3ad"; //req.kauth.grant.access_token.content.sub;
    const book_id = req.params.book;

    cart_service.removeBookFromCart(user_id, book_id)
        .then(c => res.status(202).json(c.toObject()))
        .catch(err => {
            console.error(`error getting user ${user_id} cart`, err);
            res.status(500).send(err.message);
        });
}

