'use strict';

const roles = {
    customer: {
        can: ['view', 'register', 'edit']
    },
    admin: {
        can: ['view', 'create', 'delete', 'edit', 'update']
    },
    technician: {
        can: ['view', 'edit']
    }
}

export default roles;