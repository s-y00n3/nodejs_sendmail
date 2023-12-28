import * as nodeMailer from 'nodemailer'

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port : 587,
    secure: false,
    auth: {
        user: 's3yoon17@gmail.com',
        pass: 'mrjb obpp pejj umcl',
    },
    from: {
        from: 's3yoon17@gmail.com',
        subject : '메일 TEST'
    }
})

export const mail = function (req, res) {
    console.log(req.body);
    const mailInfo = transporter.sendMail({
        from: 'aaa@gmail.com',
        to: "s3yoon17@gmail.com",
        subject: req.name,
        text: req.message,
        html: ''
    });
    
    try {
        transporter.sendMail(mailInfo, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(info.response);
            }
        });
      } catch (err) {
        
      }

}

module.exports = {
    sendMail:function(req, res) {
        
    }
}