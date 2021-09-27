const Applications = require("../models/applications");

function getAll (queries) {
  let {search,sort,page,limit} = queries

    const myCustomLabels = {
        docs: 'applications',
        totalDocs:'totalApplications'
    }
    const options = {
        populate: ['graduate','vacancy'],
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sort: sort ? {createdAt:sort} : {createdAt:'asc'}, 
        customLabels: myCustomLabels,      
    };

    return Applications.paginate({},options);
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
  getById
}


