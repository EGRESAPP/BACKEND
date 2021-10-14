const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const applicationSchema = new mongoose.Schema({
    graduate: {
        type: mongoose.Schema.Types.ObjectId, ref: 'graduates',
        required:true
    },
    vacancy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'vacancies',
        required:true
    },
    company: {
        type:String
    },
    status:{
        type:String,
        enum: ['Aceptado','Rechazado',"Pendiente"],
        default:"Pendiente"
    },
},{
    timestamps:true
});

applicationSchema.plugin(mongoosePaginate);

const model = mongoose.model('application',applicationSchema);

module.exports = model;