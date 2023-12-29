import * as nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port : 587,
    secure: false,
    // google 계정에서 발급
    auth: {
        user: process.env.GOOGLEID, 
        pass: process.env.GOOGLEPW,
    }
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Schema = mongoose.Schema;
const mailSchema = new Schema({
    name: String,
    email: String,
    message: String
});

const Mail = mongoose.model('Mail', mailSchema);

export const mail = function (req, res, next) {
    let data = req.body;
    let email = data.email;
    let name = data.name;
    let message = data.message;

    const validCheck = email.indexOf("@");

    if (!validCheck || validCheck.length === 0 || validCheck === -1) {
        return res.status(400).json({message: '유효한 이메일 아님'});
    }

    transporter.sendMail({
        from: email,
        to: "sykim@jfpartners.co.kr",
        subject: name,
        text: message,
        html: ''
    }, (error, info) => {
        if (error) {
            console.log(error);
        }
        const mailMongo = new Mail({
            name : name,
            email: email,
            message: message
        });
        
        mailMongo.save();
        
        res.status(200).json({"message" : 'success'});
        transporter.close();
    });
}
