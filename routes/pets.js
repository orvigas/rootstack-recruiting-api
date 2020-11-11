/*IMPORTS*/
const db = require('../db');

module.exports = async (ctx) => {
  const userId = ctx.request.jwtPayload.id;
  const pets = await db.select(['name', 'species'])
    .from('pets')
    .where({ user_id: userId });
  ctx.body = pets;
};