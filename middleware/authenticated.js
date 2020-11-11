/*IMPORTS*/
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'regdgfs4356sgdgff.jkhasberf@';

module.exports = async (ctx, next) => {
    if (!ctx.headers.authorization) ctx.throw(403, 'Forbidden.');
    const token = ctx.headers.authorization.split(' ')[1];

    try {
        ctx.request.jwtPayload = jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(err.status || 403, err.text);
    }

    await next();
};