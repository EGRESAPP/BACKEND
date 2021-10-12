const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    city:{
        type:String,
        minlength:2,
        maxLenght:50
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

universitiesSchema.plugin(mongoosePaginate);

const model = mongoose.model('universities',universitiesSchema);

module.exports = model;