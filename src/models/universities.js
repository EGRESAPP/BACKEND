const mongoose = require('mongoose');

const universitiesSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxLenght:30,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default: 'https://mongoose-os.com/images/generic_user.png'
    },
    cover:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String,
        minlength:2,
        maxLenght:50
    },
    webSite:{
        type:String
    },
    description:{
        type:String,
    },
},
{
    timestamps: true
});

const model = mongoose.model('universities',universitiesSchema);

module.exports = model;