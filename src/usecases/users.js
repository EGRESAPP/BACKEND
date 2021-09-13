const Users = require('../models/users')
const bcrypt = require('../lib/bcrypt')


async function getAll(queries) {
    let {search,sort,page,limit} = queries

    const filter = {email:{ "$regex": search}}

    const myCustomLabels = {
        docs: 'users',
        totalDocs:'totalUsers'
    }
    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sort: sort ? {createdAt:sort} : {createdAt:'asc'}, 
        customLabels: myCustomLabels,      
    };
    if(search)
        return await Users.paginate(filter,options);
    else
        return await Users.paginate({},options);
 }
 
async function create (usersData) {
    const {email, password} = usersData

    const usersFound = await Users.findOne({email})

    if(usersFound) throw new error ('email alredy exist')
    const encryptedPasword = await bcrypt.hash(password)
    
    return Users.create({...usersData, password: encryptedPasword})
}
 
 function deleteById(id) {
    return Users.findByIdAndDelete(id)
 }
 
  async function updateById(id, newData) {

    const {password} = newData

     //solo si hay password se encripta
    let encryptedPasword
    if(password)
        encryptedPasword = await bcrypt.hash(password)

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