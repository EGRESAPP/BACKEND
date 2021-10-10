const Graduates = require("../models/graduates");
const bcrypt = require("../lib/bcrypt");

async function getAll(queries) {
  if (Object.keys(queries).length !== 0) {
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

      return await Graduates.paginate(filter, options);
    }
    return await Graduates.paginate({}, options);
  } else {
    return await Graduates.find();
  }
}

async function create(data) {
  const { email, password } = data;
  const found = await Graduates.findOne({ email });
  if (found) 
    throw new Error("email alredy exist");
  const encryptedPasword = await bcrypt.hash(password);

  return Graduates.create({ ...data, password: encryptedPasword });
}

async function updateAvatar(path,email) {
    const entity = await Graduates.findOneAndUpdate({email},{avatar:path},{new:true})
    if(entity){
        return entity.avatar
    }
    throw new Error("Entity not found");   
    
}

async function updateCover(path,email) {
    const entity = await Graduates.findOneAndUpdate({email},{cover:path},{new:true})
    if(entity){
        return entity
    }
    throw new Error("Entity not found"); 
}

function deleteById(id) {
  return Graduates.findByIdAndDelete(id);
}

async function updateById(id, newData) {
  const { password } = newData;

  //solo si hay password se encripta
  let encryptedPasword;
  if (password) encryptedPasword = await bcrypt.hash(password);

  console.log(encryptedPasword)

  //3th new:true te regresa el objeto actualizado
  return Graduates.findByIdAndUpdate(id,{ ...newData, password: encryptedPasword }, { new: true }
  );
}

function getById(id) {
  return Graduates.findById(id);
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