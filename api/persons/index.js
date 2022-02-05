const { Router } = require("express");
const Person = require("./persons.model");
const Validations = require("./Validations");

const router = Router();

router.get("/api/persons", async (req, res) => {
  const persons = await Person.find();
  res.status(200).json(persons);
});

router.get("/api/persons/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);
  const person = await Person.findOne({ id });
  if (person === null) {
    res.status(404).json({ error: "Person not found" });
  }
  res.status(200).json(person);
});

router.post("/api/persons", Validations.valid, async (req, res) => {
  const { name, number } = req.body;
  const id = Math.floor(Math.random() * (100000 - 5)) + 5;
  let person = new Person({ id, name, number });
  const new_person = await person.save();
  res.status(201).json(new_person);
});

router.delete("/api/persons/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);
  await Person.deleteOne({ id });
  res.status(200).json({ message: "Person deleted" });
});

router.get("/info", async (req, res) => {
  const number = await Person.countDocuments({});
  const text = `Phonebook has info for ${number} people <br/> ${new Date()}`;
  res.status(200).send(text);
});

module.exports = router;
