const express = require("express");
const router = express.Router();
const userrecords = require("../services/userrecords.service");

router.get("/", async (req, res) => {
  try {
    var people = await userrecords.getAll();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    var createdPerson = await userrecords.createPerson(req.body);
    res.status(201).json(createdPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await userrecords.findPersonById(id);
    if (!person) {
      return res.status(404).json({ statusCode: 404, error: `Person with id ${id} does not exist` });
    }
    return res.json(person);
  } catch (error) {
    console.error(`Error while fetching person with id ${id}: `, error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});


router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const existingPerson = await userrecords.findPersonById(id);
    if (!existingPerson) {
      return res.status(404).json({ statusCode: 404, error: `Person with id ${id} does not exist` });
    }
    const updatedPerson = await userrecords.updatePerson(req.body);
    return res.json(updatedPerson);
  } catch (error) {
    console.error(`Error while updating person with id ${id}: `, error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var exisitingPerson = await userrecords.findPersonById(req.params.id);
    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }

    await userrecords.deletePerson(req.params.id);
    return res.json({
      statusCode: 200,
      message: `person with id: ${req.params.id} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;

// route functions
