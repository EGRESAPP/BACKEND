const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const graduatesSchema = new mongoose.Schema({
    graduate: {
        type: mongoose.Schema.Types.ObjectId, ref: 'universities'
    },
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
    certificate:{
        type:Boolean,
        default:false
    },
    title:{
        type:String
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

graduatesSchema.plugin(mongoosePaginate);

const model = mongoose.model('graduates',graduatesSchema);

module.exports = model;