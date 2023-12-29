const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
//kitty.save().then(() => console.log('meow'));

const mailSchema = new Schema({
    name: String,
    email: String,
    message: String
});

const Mail = mongoose.model('Mail', mailSchema);
const mail = new Mail({
    name : 'seoyoon',
    email: 's3yoon17@gmail.com',
    message: 'mongoose insert test'
});

mail.save().then(() => console.log('mailll'));


