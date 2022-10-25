const Joi = require('joi');

class Validator {
    validateBook = (obj) => {
        const schema = Joi.object().keys({
            product: Joi.string().alphanum().required(),
            title: Joi.string().required(),
            subtitle: Joi.string().required(),
            image: Joi.string().required(),
            price: Joi.number().positive().precision(4).required(),
            qty: Joi.number().min(1).required(),
        });
        return schema.validate(obj);
    }
}

module.exports = new Validator()