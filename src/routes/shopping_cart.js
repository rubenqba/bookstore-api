const express = require("express");
const keycloak = require("../config/keycloak");
const router = express.Router();

const controller = require('../controllers/shopping_cart');

// GET user shopping cart
router.get("/cart", keycloak.protect(), controller.get_cart);
router.post("/cart", keycloak.protect(), controller.close_cart);
router.post("/cart/book", keycloak.protect(), controller.add_book);
router.delete("/cart/book/:book", keycloak.protect(), controller.remove_book);

module.exports = router;