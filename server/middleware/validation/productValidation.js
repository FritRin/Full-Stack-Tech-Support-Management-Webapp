const validateProduct = (req, res, next) => {
    const errors = {};

    const {
        productCode, name, version, releaseDate
    } = req.body;

    if(!productCode?.trim()) {
        errors.productCode = 'Product code is required';
    }

    if (!/^[A-Z0-9]+$/.test(productCode)) {
        errors.productCode - 'Product code can only consist of letters and numbers'
    }

    if(!name?.trim()) {
        errors.name = 'Product name is required';
    }

    if(!version?.trim()) {
        errors.version = 'Version is required';
    }

    if(!releaseDate?.trim()) {
        errors.releaseDate = 'Release date is required';
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({
            error: 'Validation failed.',
            details: errors
        });
    }

    next();
};

export { validateProduct };