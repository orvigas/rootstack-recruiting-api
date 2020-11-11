
const jwt = require('jsonwebtoken');
const bcrypt = require('../utilities/bcrypt');

/*DB*/
const db = require('../db');

const secret = process.env.JWT_SECRET || 'regdgfs4356sgdgff.jkhasberf@';

/*MESSAGES*/
const wrongUserPassMsg = 'Incorrect username and/or password.';

exports.login = async (ctx) => {

    const { username, password } = ctx.request.body;

    if (!username) ctx.throw(400, 'Username required.');
    if (!password) ctx.throw(400, 'Password required.');

    const dbUser = await db.first(['id', 'username', 'passwordHash'])
        .from('users')
        .where({ username });

    if (!dbUser) ctx.throw(401, wrongUserPassMsg);

    if (await bcrypt.compare(password, dbUser.passwordHash)) {
        const token = jwt.sign(dbUser, secret);
        ctx.body = {
            id: dbUser.id,
            username: dbUser.username,
            type: 'Bearer',
            token: token
        }
    } else {
        ctx.throw(401, wrongUserPassMsg);
    }
}