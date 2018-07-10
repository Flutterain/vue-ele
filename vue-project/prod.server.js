var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

// 开启express
var app = express();

// 开启路由
var router = express.Router();

// 配置路由
router.get('/',function(req,res,next) {
  req.url = '/index.html';
  next();
})

// 调用路由
app.use(router);

// 导入数据
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRouter = express.Router();

apiRouter.get('/seller',function(req,res) {
  res.json({
    errno: 0,
    data: seller
  })
});

apiRouter.get('/goods',function(req,res) {
  res.json({
    errno: 0,
    data: goods
  })
});

apiRouter.get('/ratings',function(res,req) {
  res.json({
    errno: 0,
    data: ratings
  })
});

app.use('/api',apiRouter);

app.use(express.static('./dist'));

module.exports = app.listen(port,function (err) {
  if(err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})



