const db = require("../config/db");

const getAll = async () => {
  return await db.ucccounts.findAll();
};

const findPersonById = async (id) => {
  return await db.ucccounts.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.ucccounts.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.ucccounts.update(
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
  await db.ucccounts.destroy({
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
