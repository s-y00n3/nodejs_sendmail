const session = require('express-session');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Schema = mongoose.Schema;
const mailSchema = new Schema({
    name: String,
    telephone: String,
    message: String,
    country: String,
    date : {type: Date, default: Date.now}
}, {collection : 'mails'});

const UserSchema = new Schema({
    email : String,
    password : String,
    date : {type:Date, default: Date.now}
});


export const login = function(req, res, next) {
    res.render('admin/login');
}

export const auth = async function(req, res, next) {
    const email = req.body.email;
    const pw = req.body.password;
    
    const userModel = mongoose.model('user', UserSchema, 'user');
    const user = await userModel.findOne({"email" : email, "password" : pw});
    
    if(user) {
        req.session.email = email;
        req.session.isLogin = true;
        res.redirect('/admin/list');
    } else {
        res.render('admin/login', {error : "Login Fail"});
    }
}

export const list = async function(req, res, next) {
    if (req.session.isLogin !== true) {
        res.redirect('/admin/login');
    }
    const Mail = mongoose.model('mails', mailSchema);
    const MailData = await Mail.find({});
    res.render('admin/list', {data : MailData, moment : moment});
}

export const logout = function(req, res, next) {
    try {
        if (req.session.isLogin) {
            req.session.destroy();
        }
    }
    catch (e) {
      console.log(e)
    }
  res.redirect('/admin');
}