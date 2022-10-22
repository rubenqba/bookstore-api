// Require Mongoose
const mongoose = require("mongoose");

const Types = mongoose.Schema.Types;

function translateDecimals(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
}

function removeObjectId(doc, ret) {
    // if (doc.id) {
    //     ret.id = ret._id;
    // }
    delete ret._id;
    return ret;
}

const BookSelectionSchema = mongoose.Schema({
    product: Types.String,
    title: Types.String,
    subtitle: Types.String,
    image: Types.String,
    price: {
        type: Types.Decimal128,
        required: true,
        transform: translateDecimals
    },
    qty: Types.Number,
}, {
    toObject: {
        transform: removeObjectId
    }
});

BookSelectionSchema.methods.joiValidate = function (obj) {
    const Joi = require('joi');
    const schema = {
        product: Joi.types.String().alphanum().required(),
        title: Joi.types.String().required(),
        subtitle: Joi.types.String().required(),
        image: Joi.types.String().required(),
        price: Joi.types.number().positive().precision(2).required(),
        qty: Joi.types.number().min(1).required(),
    }
    return Joi.validate(obj, schema);
}

const ShoppingCartSchema = mongoose.Schema({
    status: {
        type: Types.String,
        required: true,
        enum: ["pending", "completed"],
        default: "pending",
    },
    owner: Types.String,
    products: [BookSelectionSchema],
    updated: { type: Types.Date, default: Date.now },
    total: {
        type: mongoose.Types.Decimal128,
        default: 0.0,
        transform: translateDecimals,
    },
}, { 
    virtuals: {
        id: {
            get() {
                return this._id;
            }
        }
    },
    toObject: { virtuals: true, versionKey: false, transform: removeObjectId } 
});

module.exports = { BookSelectionSchema, ShoppingCartSchema };