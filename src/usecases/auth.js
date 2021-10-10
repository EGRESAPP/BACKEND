const Graduates = require("../models/graduates");
const Companies = require("../models/companies");
const Universities = require("../models/universities");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

async function login(email,passwordR,entity){
    
    if(!entity) throw new Error("Debes seleccionar Una Entidad");

    let found
    if(entity==="Universities")
        found = await Universities.findOne({email});

    if(entity==="Companies")
        found = await Companies.findOne({email});

    if(entity==="Graduates")
        found = await Graduates.findOne({email});

    if(!found) throw new Error("Usuario no localizado, favor de revisar entidad o correo proporcionado");

    const {_id,name,lastName,avatar,password} = found

    const isValidPassword = await bcrypt.compare(passwordR,password);

    if(!isValidPassword) throw new Error("Contraseña no valida");

    const token = jwt.sign({id:_id});

    return {_id,name,lastName,email,avatar,token,entity}

}

module.exports = { login }