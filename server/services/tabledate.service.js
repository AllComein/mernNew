const db = require("../config/db");

const getAll = async () => {
  return await db.tabledate.findAll();
};

const findPersonById = async (id) => {
  return await db.tabledate.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.tabledate.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.tabledate.update(
    { name, position , location },
    {
      where: {
        Id: Id,
      },
    }
  );
  return { name, position, location ,Id};
};

const deletePerson = async (Id) => {
  await db.tabledate.destroy({
    where: { Id: Id },
  });
};

module.exports = {
  getAll,
  findPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
