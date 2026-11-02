const validateIncident = (req, res, next) => {
    const errors = {};

    const {
        productCode, dateOpened, title, description
    } = req.body;

    if(!productCode?.trim()) {
        errors.productCode = 'Product code is required';
    }

    if(!dateOpened?.trim()) {
        errors.dateOpened = 'Date of incident is required';
    }

    if(!title?.trim()) {
        errors.title = 'Title is required';
    }

    if(!description?.trim()) {
        errors.description = 'Incident description required';
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({
            error: 'Validation failed.',
            details: errors
        });
    }

    next();
};

export { validateIncident };