
const jwt = require('jsonwebtoken');
const bcrypt = require('../utilities/bcrypt');

/*DB*/
const db = require('../db');

const secret = process.env.JWT_SECRET || 'regdgfs4356sgdgff.jkhasberf@';

/*MESSAGES*/
const wrongUserPassMsg = 'Incorrect username and/or password.';

exports.getAllByUserId = async (ctx) => {
    let userId = ctx.request.jwtPayload.id;
    ctx.body = await db.select(['id', 'task_name', 'long', 'lat', 'desc', 'user_id'])
        .from('geo_jobs')
        .where({ user_id: userId });
}

exports.getById = async (ctx) => {
    let userId = ctx.request.jwtPayload.id;
    let recId = ctx.params.id;
    ctx.body = await db.select(['id', 'task_name', 'long', 'lat', 'desc', 'user_id'])
        .from('geo_jobs')
        .where({ id: recId }).andWhere({ user_id: userId }).first();
}

exports.save = async (ctx) => {
    let userId = ctx.request.jwtPayload.id;
    let request = ctx.request.body;
    ctx.body = await db('geo_jobs').insert({
        'task_name': request.task_name,
        'long': request.long,
        'lat': request.lat,
        'desc': request.desc,
        'user_id': userId
    }).then(rec => {
        return db.select(['*'])
            .from('geo_jobs')
            .where({ id: rec[0] }).first()
    });
}

exports.update = async (ctx) => {
    let user_id = ctx.request.jwtPayload.id;
    let id = Number.parseInt(ctx.params.id);
    let request = ctx.request.body;
    delete request.id;
    ctx.body = await db('geo_jobs').where({ id, user_id }).update(request).then(rec => {
        return db('geo_jobs').where({ id }).first();
    });
}

exports.delete = async (ctx) => {
    let user_id = ctx.request.jwtPayload.id;
    let id = Number.parseInt(ctx.params.id);
    ctx.body = await db('geo_jobs').where({ id, user_id }).del();
}