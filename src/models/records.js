const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

recordsSchema.plugin(mongoosePaginate);

const model = mongoose.model('records',recordsSchema);

module.exports = model;