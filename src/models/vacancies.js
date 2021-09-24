const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const vacanciesSchema = new mongoose.Schema({
    position:{
        type:String,
        minlength:2,
        maxLenght:50,
        require:true
    },
    city:{
        type:String,
        minlength:2,
        maxLenght:50,
        require:true
    },
    location:{
        type:String,
        minlength:2,
        maxLenght:50
    },
    part_time:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required:true
    },
},
{
    timestamps:true
});

const model = mongoose.model('vacancies',vacanciesSchema);

module.exports = model;