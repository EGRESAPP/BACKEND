const Applications = require("../models/applications");

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

      return await Applications.paginate(filter, options);
    }
    return await Applications.paginate({}, options);
  } else {
    return await Applications.find();
  }
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


