var axios = require('axios')
var koa = require('koa');
var router = require('./routers')
var cors = require('koa-cors');
var serve = require('koa-static');
var app = new koa();
var chalk = require('chalk');

/**
 * apihost 为正式的后端host地址,请自行配置如:
 * apihost = "http://api.example.com" 
 */
var apihost = '';



/**
 * 请求服务器api接口数据
 * 如果有数据返回api接口数据
 * 如果没有或者请求报错返回自定义路由配置数据
 */
app.use(cors());
app.use(serve('static/'));
app.use(async function(ctx, next) {
    /**
     * 设置请求配置
     * 
     */
    var options = {
        url: apihost + ctx.url,
        headers: ctx.header
    };
    var getin = axios.get(options.url, {
            headers: options.headers
        })
        .then(function(response) {
            try {
                return JSON.parse(response.data)

            } catch (e) {
                console.log(chalk.red(e));
                throw e
            }
        })
        .catch(function(error) {
            console.log(chalk.red(error));
            throw error
        });
    try {
        await getin
        console.log("The json data from:" + chalk.green(apihost + ctx.url))
        ctx.body = await getin
    } catch (e) {
        console.log("The json data from:" + chalk.cyan("127.0.0.1:3000" + ctx.url))
        await next()
    }

});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening to localhost:3000')
module.exports = app