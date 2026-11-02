const validateTechnician = (req, res, next) => {
    const errors = {};

    const {
        firstName, lastName, email, phone, password
    } = req.body;

    if(!firstName?.trim()) {
        errors.firstName = 'First name is required';
    }

    if(!lastName?.trim()) {
        errors.lastName = 'Last name is required';
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

const validateTechnicianId = (req, res, next) => {
    const id = Number(req.params.Technicianid);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'Invalid Technician ID'
        });
    }
    next();
};

export { validateTechnician, validateTechnicianId };