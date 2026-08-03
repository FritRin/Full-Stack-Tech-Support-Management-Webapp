'use strict';
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({error: 'Authentication required'})
        }

        if (!allowedRoles.includes(req.user.role)){
            res.status(403).json({message: "Acess Denied"});
        }

        next();
    };
};

export default checkRole;