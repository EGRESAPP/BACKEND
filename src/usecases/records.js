const Records = require('../models/records');

async function getAll(queries) {
    if (Object.keys(queries).length !== 0) {
      let { q, sort, order, page, limit } = queries;
  
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sort: sort ? { [sort]: order } : { createdAt: "asc" }
      };
      if (q) {
        const match = new RegExp(q, "i");
        const filter = {
          $or: [
            { email: { $regex: match } },
            { name: { $regex: match } },
            { lastName: { $regex: match } },
            { city: { $regex: match } },
            { title: { $regex: match } },
          ],
        };
  
        return await Records.paginate(filter, options);
      }
      return await Records.paginate({}, options);
    } else {
      return await Records.find();
    }
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
    return Records.findById(id).populate('graduate')
}

module.exports = {
    getAll,
    deleteById,
    updateById,
    getById,
    create
}