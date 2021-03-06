// app.js  项目的主文件
// 创建错误中间件
var createError = require('http-errors');
// 加载express框架
var express = require('express');
// 加载path模块
var path = require('path');
// 处理cookie信息的模块   解析cookie
var cookieParser = require('cookie-parser');
// 处理访问日志的模块     在命令行中打印的记录  
var logger = require('morgan');
// 加载路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/login")
// 创建/初始化 express()实例   编写入口函数
var app = express();
// 加载ejs模块   修改视图引擎
var ejs=require("ejs");
// view engine setup    设置默认的试图引擎
app.set('views', path.join(__dirname, 'views'));//设置试图文件的路径
app.engine(".html",ejs.__express);
app.set('view engine', 'html');//设置默认的试图文件
// 使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/views",express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
