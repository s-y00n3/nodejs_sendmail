import * as createError from 'http-errors';
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'

import * as indexRouter from './routes/index'
import * as usersRouter from './routes/users'
import * as mailRouter from './routes/mail'

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter.test);
app.get('/users', usersRouter.test);
// app.post('/mail', function (req, res) {
//   let post = req.body;
//   let name = post.name;
//   let message = post.message;

//   res.render('mail', {
//     name: name,
//     message: message
//   })
// });

app.post('/mail', mailRouter.mail);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, async () => {
  console.log(`Express Server listening on port ${3000}`)
})
// module.exports = app;
