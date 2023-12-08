import jwt from 'jsonwebtoken';

const generateID= () => Date.now().toString(32) + Math.random().toString(32).substring(3);
const jwtToken = (userId) => jwt.sign(
    {
        domain: process.env.JWT_DOMAIN,
        author: process.env.JWT_AUTHOR,
        signature: process.env.JWT_SIGNATURE,
        year: process.env.JWT_YEAR,
        userId
    }, process.env.JWT_HASHSTRING, {expiresIn: '1d'}
);

export {generateID, jwtToken}