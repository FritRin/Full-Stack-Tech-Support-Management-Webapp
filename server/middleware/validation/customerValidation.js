const validateCustomer = (req, res, next) => {
    const errors = {};

    const {
        firstName, lastName, address, city, state, postalCode, countryCode, email, phone, password
    } = req.body;

    if(!firstName?.trim()) {
        errors.firstName = 'First name is required';
    }

    if(!lastName?.trim()) {
        errors.lastName = 'Last name is required';
    }

    if(!address?.trim()) {
        errors.address = 'Address is required';
    }

    if(!city?.trim()) {
        errors.city = 'City is required';
    }

    if(!state?.trim()) {
        errors.state = 'State is required';
    }

    if(!postalCode?.trim()) {
        errors.postalCode = 'Postal code is required';
    }

    if(!countryCode?.trim()) {
        errors.countryCode = 'Country is required';
    }

    if(!email?.trim()) {
        errors.email = 'Email is required';
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address'
    }

    if(!phone?.trim()) {
        errors.phone = 'Phone number is required';
    }

    if (!/^[0-9+\- ()]+$/.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
    }

    if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({
            error: 'Validation failed.',
            details: errors
        });
    }

    next();
};

const validateCustomerId = (req, res, next) => {
    const id = Number(req.params.customerid);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'Invalid customer ID'
        });
    }
    next();
};

export { validateCustomer, validateCustomerId };