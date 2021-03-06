const Vacancies = require("../models/vacancies");
const bcrypt = require("../lib/bcrypt");

async function getAll(queries) {
  if (Object.keys(queries).length !== 0) {
    let { q, sort, order, page, limit } = queries;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: sort ? { [sort]: order } : { createdAt: "asc" },
      populate: 'company',
    };
    if (q) {
      const match = new RegExp(q, "i");
      const filter = {
        $or: [
          { position: { $regex: match } },
          { city: { $regex: match } },
          { description: { $regex: match } },
        ],
      };

      return await Vacancies.paginate(filter, options);
    }
    return await Vacancies.paginate({}, options);
  } else {
    return await Vacancies.find();
  }
}

async function create(vacancyData) {
  return Vacancies.create(vacancyData);
}

function deleteById(id) {
  return Vacancies.findByIdAndDelete(id);
}

async function updateById(id, newData) {

  //3th new:true te regresa el objeto actualizado
  return Vacancies.findByIdAndUpdate(id,newData,{new:true});
}

function getById(id) {
  return Vacancies.findById(id).populate('company');
}

module.exports = {
  getAll,
  deleteById,
  updateById,
  getById,
  create
};
