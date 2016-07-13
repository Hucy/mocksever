var request = require('request');
var koa = require('koa');
var router = require('koa-router')();
var cors = require('koa-cors');
var mockdata=require('./mockschema');
var schemadata=require('./mock');
var serve = require('koa-static');
var app=new koa();
var apihost=' ';
var chalk = require('chalk');
/**
 * 路由配置
 */
router
  .get('/', async function (ctx, next) {
    ctx.body=mockdata
  })
  .get("/mock",async function(ctx,next){
    ctx.body=mockdata
  });










/**
 * 请求服务器api接口数据
 * 如果有数据返回api接口数据
 * 如果没有或者请求报错返回自定义路由配置数据
 */
app.use(cors());
app.use(serve('static/'));
app.use(async function(ctx,next){
  // console.log(ctx.url)
  var options = {
        url: apihost+ctx.url,
        headers: { 'User-Agent': 'request' }
    };
  var getin= new Promise(function(resolve, reject) {
    request.get(options, function (error, response, body) {
      if(error){
        reject(error)
      }else {
        try {
          let newres=JSON.parse(body)
          resolve(newres)
        } catch (e) {
          reject(e)
        }
      }

    })
  });
  try {
    await getin
    console.log("The json data from:"+chalk.green(apihost+ctx.url ))
    ctx.body= await getin

  } catch (e) {
    console.log("The json data from:"+chalk.cyan("127.0.0.1:3000"+ctx.url ))
    await next()
  }

});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = app
