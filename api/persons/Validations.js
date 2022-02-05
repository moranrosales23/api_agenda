const Person = require("./persons.model");

function valid(req, res, next) {
  const { name, number } = req.body;
  if (!validField(name)) {
    return res.status(400).json({ error: "the name is required" });
  }
  if (!validField(number)) {
    return res.status(400).json({ error: "the number is required" });
  }
  if (duplicateName(name)) {
    return res.status(400).json({ error: "person must be unique" });
  }

  next();
}

function validField(field) {
  return field !== null && field.trim().length > 0;
}

async function duplicateName(name) {
  return await Person.find({ name });
}

module.exports = { valid };
