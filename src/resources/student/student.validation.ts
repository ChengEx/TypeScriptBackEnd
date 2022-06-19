import Joi from 'joi';

const register = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required()
});

const login = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export default { register, login };