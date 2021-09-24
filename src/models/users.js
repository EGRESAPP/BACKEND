const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxLenght:30,
        required:true
    },
    lastName:{
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
    role:{
        type:String,
        enum: ['Egresado', 'Universidad',"Empresa"],
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
        type:Number,
        min:10,
        max:10
    },
    age:{
        type:Number,
        min:1,
        max:90
    },
    city:{
        type:String,
        minlength:2,
        maxLenght:50
    },
    location:{
        type:String,
        minlength:2,
        maxLenght:50
    },
    website:{
        type:String,
    },
    description:{
        type:String,
    },
},
{
    timestamps: true
});

usersSchema.plugin(mongoosePaginate);

const model = mongoose.model('users',usersSchema);

module.exports = model;