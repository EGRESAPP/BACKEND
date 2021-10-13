const Applications = require("../models/applications");

async function getAll(queries,id) {
    let { page, limit } = queries;
    
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: "asc" },
      populate: ['vacancy', 'graduate']
    };    
    return await Applications.paginate({graduate:id}, options);
 
}

function create (dataApplication) {
  return Applications.create(dataApplication)
}

function deleteById(id) {
  return Applications.findByIdAndDelete(id)
}


function getById(id) {
  return Applications.findById(id).populate('graduate').populate('vacancy')
}
function updateById(id, dataToUpdate) {
  return Applications.findByIdAndUpdate(id, dataToUpdate,{new: true})
}

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
}


