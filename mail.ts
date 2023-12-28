import * as nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port : 587,
    secure: false,
    auth: {
        user: 's3yoon17@gmail.com',
        pass: 'mrjb obpp pejj umcl',
    }
})

export const mail = function (req, res, next) {
    let data = req.body;
    let email = data.email;
    let name = data.name;
    let message = data.message;

    const validCheck = email.indexOf("@");

    if (!validCheck || validCheck.length === 0 || validCheck === -1) {
        return res.status(400).json({message: '유효한 이메일이 아님'});
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
        res.status(200).json({"message" : 'success'});
        transporter.close();
    });
}
