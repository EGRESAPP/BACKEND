const Users = require('../models/users')
const bcrypt = require('../lib/bcrypt')


function getAll(params) {
    const {name,email,age,city} = params
    return Users.find({name,email,age,city})
 }
 
async function create (usersData) {
    const {email, password} = usersData

    const usersFound = await Users.findOne({email})
    
    if(usersFound) throw new error ('email alredy exist')
 
    if(password) 
    const encryptedPasword = await bcrypt.hash(password)
 
    return Users.create({...usersData, password: encryptedPasword})
}
 
 function deleteById(id) {
    return Users.findByIdAndDelete(id)
 }
 
  async function updateById(id, newData) {

     const {password} = newData

     //solo si hay password se encripta
     if(password)
     const passwordEncrypted = await bcrypt.hash(password)

     //3th new:true te regresa el objeto actualizado
     return Users.findByIdAndUpdate(id, {...newData, password:  passwordEncrypted }, { new: true })

 }

function getById (id){
    return Users.findById(id)
}

module.exports = {
    getAll,
    deleteById,
    updateById,
    getById,
    create
}