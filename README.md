## mocksever
一个简单本地mock服务器,可以代理后端服务器返回的数据,支持服务器自动重启,监视文件夹为`./mockroute`.

## 使用

```
git clone https://github.com/Hucy/mocksever.git

cd mocksever

npm i

npm start

```
## 配置
`./mockroute/index.js`:
- 修改后端api地址:



修改 `apihost='https://api.github.com/repos/vuejs'`中`apihost`的值为后端服务器APi接口地址.

- 本地mock路由配置:

```
/**
 * 路由配置
 */
router
  .get('/', function (ctx, next) {
    console.log(ctx)
    ctx.body = mockdata.root
  })
  .get("/mock",function(ctx,next){
    ctx.body=mockdata.mock
  });

```
- mock数据:

 默认为`./mockroute/mockdata.json` 文件.也可以自己新建mock数据,记得在`./mockroute/index.js`中引入自己编写的mock数据文件.
