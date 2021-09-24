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
      {company: {$regex: user_id}}
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

async function create(vacancieData) {
  const { position, city, part_time, salary, location, description, updatedAt, createdAt, company } = vacancieData;
//  const vacanciesFound = await Vacancies.findOne({ email });

  // if (usersFound) throw new error("email alredy exist");
  // const encryptedPasword = await bcrypt.hash(password);

  return Vacancies.create();
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
  const { password } = newData;

  //3th new:true te regresa el objeto actualizado
  return vacancy.findByIdAndUpdate(id,{newData}
  );
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
