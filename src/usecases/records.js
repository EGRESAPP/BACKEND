const Records = require('../models/records')
const bcrypt = require('../lib/bcrypt')

async function getAll(queries) {
    let {search,sort,page,limit} = queries

    const filter = {
        $or: [
        { description: { $regex: search } },
        { period: { $regex: search } },
        { position: { $regex: search } },
        ],
        }; 

    const myCustomLabels = {
        docs: 'records',
        totalDocs:'totalRecords'
    }
    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sort: sort ? {createdAt:sort} : {createdAt:'asc'}, 
        customLabels: myCustomLabels,      
    };
    if(search)
        return await Records.paginate(filter,options);
    else
        return await Records.paginate({},options);
 }
 
async function create (recordsData) {
    return Records.create(recordsData)
}
 
 function deleteById(id) {
    return Records.findByIdAndDelete(id)
 }
 
  async function updateById(id, nuevoRecord) {
    return Records.findByIdAndUpdate(id,nuevoRecord,{new:true})
 }

function getById (id){
    return Records.findById(id)
}

module.exports = {
    getAll,
    deleteById,
    updateById,
    getById,
    create
}