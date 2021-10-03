const Companies = require("../models/companies");
const bcrypt = require("../lib/bcrypt");

async function getAll(queries) {
  if (queries) {
    let { q, sort, order, page, limit } = queries;

    const myCustomLabels = {
      docs: "graduates",
      totalDocs: "totalGraduates",
    };
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: sort ? { [sort]: order } : { createdAt: "asc" },
      customLabels: myCustomLabels,
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

      return await Companies.paginate(filter, options);
    }
    return await Companies.paginate({}, options);
  } else {
    return await Companies.paginate({});
  }
}

async function create(data) {
  const { email, password } = data;
  const Found = await Companies.findOne({ email });

  if (Found) throw new error("email alredy exist");
  const encryptedPasword = await bcrypt.hash(password);

  return Companies.create({ ...data, password: encryptedPasword });
}

async function updateAvatar(path,email) {
    const entity = await Companies.findOneAndUpdate({email},{avatar:path},{new:true})
    if(entity){
        return entity
    }
    throw new Error("Entity not found");   
    
}

async function updateCover(path,email) {
    const entity = await Companies.findOneAndUpdate({email},{cover:path},{new:true})
    if(entity){
        return entity
    }
    throw new Error("Entity not found"); 
}

function deleteById(id) {
  return Companies.findByIdAndDelete(id);
}

async function updateById(id, newData) {
  const { password } = newData;

  //solo si hay password se encripta
  let encryptedPasword;
  if (password) encryptedPasword = await bcrypt.hash(password);

  //3th new:true te regresa el objeto actualizado
  return Companies.findByIdAndUpdate(id,{ ...newData, password: passwordEncrypted }, { new: true }
  );
}

function getById(id) {
  return Companies.findById(id);
}

module.exports = {
  getAll,
  deleteById,
  updateById,
  getById,
  create,
  updateAvatar,
  updateCover
};