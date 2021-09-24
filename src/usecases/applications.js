const applications = require("../models/applications");
const db = require("../lib/db");

function getAll () {
  return applications.find()
}

function create ({ user, vacancy, status }) {
  return applications.create({ user, vacancy, status })
}

function deleteById (id) {
  return applications.findByIdAndDelete(id)
}

function getById (id) {
  return applications.getById(id)
}
function updateById (id, dataToUpdate) {
  return applications.findByIdAndUpdate(id, dataToUpdate,{new: true})
}

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  getById
}


