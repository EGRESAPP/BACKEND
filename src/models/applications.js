const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required:true
    },
    vacancy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'vacancies',
        required:true
    },
    status:{
        type:String,
        enum: ['Aceptado','Rechazado',"Pendiente"],
        default:"Pendiente"
    },
},{
    timestamps:true
});

const model = mongoose.model('application',applicationSchema);

module.exports = model;