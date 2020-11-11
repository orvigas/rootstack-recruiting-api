const path = require('path');
const knex = require('knex');
module.exports = knex({
    client: 'sqlite3',
    connection: {
        user: 'admin',
        password: '1234qwer',
        filename: path.join(__dirname, 'db.sqlite')
    },
    useNullAsDefault: true,
});