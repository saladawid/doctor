import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign({id}, 'secretKey', {
        expiresIn: '30d',
    });
};

