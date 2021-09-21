const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ['Academica','Laboral']
    },
},
{
    timestamps:true
});