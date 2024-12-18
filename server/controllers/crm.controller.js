const express = require("express");
const router = express.Router();
const crmService = require("../services/crm.service");

router.get("/", async (req, res) => {
  try {
    var people = await crmService.getAll();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    var createdPerson = await crmService.createPerson(req.body);
    res.status(201).json(createdPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await crmService.findPersonById(id);
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
    const existingPerson = await crmService.findPersonById(id);
    if (!existingPerson) {
      return res.status(404).json({ statusCode: 404, error: `Person with id ${id} does not exist` });
    }
    const updatedPerson = await crmService.updatePerson(req.body);
    return res.json(updatedPerson);
  } catch (error) {
    console.error(`Error while updating person with id ${id}: `, error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var exisitingPerson = await crmService.findPersonById(req.params.id);
    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }

    await crmService.deletePerson(req.params.id);
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
