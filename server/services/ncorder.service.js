const db = require("../config/db");

const getAll = async () => {
  return await db.ncorder.findAll();
};

const findPersonById = async (id) => {
  return await db.ncorder.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.ncorder.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.ncorder.update(
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
  await db.ncorder.destroy({
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
