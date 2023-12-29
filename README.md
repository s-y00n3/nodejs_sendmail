# nodejs_sendmail
nodejs + express + ejs

기반으로 Gmail 전송하는 기본 프로그램

홈 화면에서 이름, 이메일, 내용 작성하면 메일 전송됨.

# ts-express
A ts-based express generator

# How to use ts-node in Express

### step 1: use express generator to make a new project

```
$ npm install express-generator -g
$ express --view=pug myapp
$ cd myapp && npm install
```

the project seems like:
```
├─bin
│ ├─www
├─node_modules
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
├─routes
├─views
├─app.js
└─package.json
```

### step 2: install typescript in this project

```
$ npm install typescript --save
$ npm install ts-node --save
$ npm install @types/node --save
```

### step 3: set typescript configuration

```
$ npm install typescript -g
$ tsc --init
```

then you will see there is a new file named `tsconfig.json`.
here are my settings

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    "declaration": true,
    "sourceMap": true,
    "noEmitOnError": true,
    "noUnusedLocals": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "noImplicitThis": false,
    "allowUnusedLabels": true,
    "allowJs": true
  }
}
```

except `tsconfig.json`, in order to lint your ts code,you should create `tslint.json`

```
{
  "rules": {
    "align": [
      true,
      "parameters",
      "arguments",
      "statements"
    ],
    "ban": false,
    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "curly": false,
    "eofline": false,
    "forin": false,
    "indent": [
      true,
      "spaces"
    ],
    "interface-name": false,
    "jsdoc-format": false,
    "label-position": true,
    "max-line-length": [
      false,
      180
    ],
    "member-access": false,
    "member-ordering": [
      true
    ],
    "no-any": false,
    "no-arg": true,
    "no-bitwise": true,
    "no-conditional-assignment": true,
    "no-consecutive-blank-lines": true,
    "no-console": [
      false
    ],
    "no-construct": false,
    "no-debugger": true,
    "no-duplicate-variable": true,
    "no-empty": false,
    "no-eval": true,
    "no-inferrable-types": false,
    "no-internal-module": true,
    "no-require-imports": false,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": false,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "no-var-requires": false,
    "object-literal-sort-keys": false,
    "one-line": [
      true,
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [
      false
    ],
    "radix": false,
    "semicolon": false,
    "switch-default": false,
    "trailing-comma": [
      false,
      {
        "multiline": "never",
        "singleline": "never"
      }
    ],
    "triple-equals": [
      true
    ],
    "typedef": [
      true
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": [
      true,
      "allow-leading-underscore",
      "ban-keywords"
    ],
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ]
  }
}
```

### step 4: it's time to change file ext to 'ts'

* change file ext of `app.js` and all js file below `routes/` to js

### step 5: delete `bin/www` and move listen function to `app.ts`

```app.ts
import * as createError from 'http-errors';
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'

import * as indexRouter from './routes/index'
import * as usersRouter from './routes/users'

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter.test);
app.get('/users', usersRouter.test);

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
```

### step 6: edit `/routes/index.ts` and `/routes/users.ts`

``` index.ts
export const test = function (req, res) {
    res.render('index', { title: 'Express' });
}
```

``` users.ts
export const test = function (req, res) {
    res.render('index', { title: 'Express' });
}
```

### step 7: edit `package.json` 
```package.json
"scripts": {
    "start": "ts-node app.ts"
},
```

### step 8: there are so many steps, just clone to use!
```
$ git clone git@github.com:wnbupt/ts-express.git
$ npm install
$ npm run start
```
