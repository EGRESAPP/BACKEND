const Universities = require("../models/universities");
const bcrypt = require("../lib/bcrypt");

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
          { city: { $regex: match } },
        ],
      };
      return await Universities.paginate(filter, options);
    }
    return await Universities.paginate({}, options);
  } else {
    return await Universities.find();
  }
}

async function create(data) {
  const { email, password } = data;
  const Found = await Universities.findOne({ email });

  if (Found) throw new error("email alredy exist");
  const encryptedPasword = await bcrypt.hash(password);

  return Universities.create({ ...data, password: encryptedPasword });
}

async function updateAvatar(path, email) {
  const entity = await Universities.findOneAndUpdate(
    { email },
    { avatar: path },
    { new: true }
  );
  if (entity) {
    return entity;
  }
  throw new Error("Entity not found");
}

async function updateCover(path, email) {
  const entity = await Universities.findOneAndUpdate(
    { email },
    { cover: path },
    { new: true }
  );
  if (entity) {
    return entity;
  }
  throw new Error("Entity not found");
}

function deleteById(id) {
  return Universities.findByIdAndDelete(id);
}

async function updateById(id, newData) {
  const { password } = newData;
  
  if (password) {
    //solo si hay password se encripta
    let encryptedPasword = await bcrypt.hash(password);
    //3th new:true te regresa el objeto actualizado
    return Universities.findByIdAndUpdate(id,{ ...newData, password: encryptedPasword }, { new: true });
  }else{
    //3th new:true te regresa el objeto actualizado
    return Universities.findByIdAndUpdate(id,newData, { new: true });
  }
}

function getById(id) {
  return Universities.findById(id);
}

module.exports = {
  getAll,
  deleteById,
  updateById,
  getById,
  create,
  updateAvatar,
  updateCover,
};
