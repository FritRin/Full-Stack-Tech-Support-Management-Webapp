import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(401).json({
            error: 'Authentication required'
        });
    }

    try{
        const decoded = jwt.verify (token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err){
    return res.status(403).json({
        error: 'Invalid or expired token.'
    });
    }
};

export default authenticateToken;