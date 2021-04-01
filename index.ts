// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// // var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// console.log("here");

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;




















//Created By Fahad Ansari
//Date : 3/31/2021
require('source-map-support').install()

// Main Server Started in httpListener.ts ./server/httplistener 
import { httpListener } from "./globals/server/httpListener";

// socketListener Will Hook Http Server.
import { Server } from "http";


// Main Application Loop
class __biZZC_APP_Loop {

  //private httpListener!: HTTPListener;
  private httpListener!: Server

  constructor() {
    console.log('Application Loop Initialized');
  }
  public async Run() {
    try {
      //this.httpServer = await httpServer

      await httpListener.InitHTTPMiddleWare();
      this.httpListener = httpListener.StartHttpServer();
    } catch (error) {
      console.log(error);
      console.log('Error in Running Loop');
    }

  }

}

export const server = (new __biZZC_APP_Loop());
server.Run();
