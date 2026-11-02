const validateRegistration = (req, res, next) => {
    const errors = {};

    const {
        productCode
    } = req.body;

    if(!productCode?.trim()) {
        errors.RegistrationCode = 'Registration code is required';
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({
            error: 'Validation failed.',
            details: errors
        });
    }

    next();
};

export { validateRegistration };