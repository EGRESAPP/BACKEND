const Vacancies = require("../models/vacancies");
const bcrypt = require("../lib/bcrypt");

async function getAll(queries) {
  let { search, sort, page, limit } = queries;

  const filter = {
    $or: [
      { position: { $regex: search } },
      { city: { $regex: search } },
      { location: { $regex: search } },
      { part_time: { $regex: search } },
      { description: { $regex: search } },
    ],
  };
  console.log(filter);
  const myCustomLabels = {
    docs: "vacancies",
    totalDocs: "totalVacancies",
  };
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    customLabels: myCustomLabels,
  };
  if (search) return await Vacancies.paginate(filter, options);
  else return await Vacancies.paginate({}, options);
}

async function create(vacancyData) {
 // const { position, city, part_time, salary, location, description, company } = vacancyData;
//  const vacanciesFound = await Vacancies.findOne({ email });

  // if (usersFound) throw new error("email alredy exist");
  // const encryptedPasword = await bcrypt.hash(password);

  return Vacancies.create(vacancyData);
}

async function updateVacanciesData(id) {
    const vacancy = await Vacancies.findOneAndUpdate(id)
    if(vacancy){
        return vacancy
    }
    throw new Error("Vacancy not found ;(");

}


function deleteById(id) {
  return Vacancies.findByIdAndDelete(id);
}

async function updateById(id, newData) {

  //3th new:true te regresa el objeto actualizado
  return Vacancies.findByIdAndUpdate(id,newData,{new:true});
}

function getById(id) {
  return Vacancies.findById(id);
}

module.exports = {
  getAll,
  deleteById,
  updateById,
  getById,
  create
};
