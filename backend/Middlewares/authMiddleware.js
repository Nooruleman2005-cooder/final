import joi from 'joi';

const signupValidation = (req, res, next) => {
    const signupSchema = joi.object({
        name: joi
            .string()
            .min(3)
            .max(50)
            .required(),
        email: joi
            .string()
            .min(10)
            .max(50)
            .email()
            .required(),
        password: joi
            .string()
            .min(3)
            .max(10)
            .required()
    })

    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request....",
            error: error.details[0].message
        })
    }

    next();
}

export default signupValidation