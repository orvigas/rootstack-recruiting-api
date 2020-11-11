/*IMPORTS*/
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middleware/errorHandler');

/*ROUTES*/
const auth = require('./routes/auth.route');
const jobs = require('./routes/job.route');

/*APP INIT*/
const app = new Koa();

app.use(errorHandler);
app.use(bodyParser());
app.use(cors());

/*ROUTING*/

app.use(auth.routes());
app.use(auth.allowedMethods());

app.use(jobs.routes());
app.use(jobs.allowedMethods());

app.listen(process.env.PORT || 3000);