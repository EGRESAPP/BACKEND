const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxLenght:30
    },
    lastName:{
        type:String,
        minlength:2,
        maxLenght:30
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
        enum: ['Egresado', 'Univerdidad',"Empresa"],
        require:true
    }, 
    picture:{
        type:String,
        default: 'https://mongoose-os.com/images/generic_user.png'
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
    webSite:{
        type:String,
    },
    description:{
        type:String,
    },
},
{
    timestamps: true
});

const model = mongoose.model('users',usersSchema);

module.exports = model;