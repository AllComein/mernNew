const db = require("../config/db");

const getAll = async () => {
  return await db.prio.findAll();
};

const findPersonById = async (id) => {
  return await db.prio.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.prio.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.prio.update(
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
  await db.prio.destroy({
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
