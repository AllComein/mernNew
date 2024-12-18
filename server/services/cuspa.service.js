const db = require("../config/db");

const getAll = async () => {
  return await db.cuspa.findAll();
};

const findPersonById = async (id) => {
  return await db.cuspa.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.cuspa.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.cuspa.update(
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
  await db.cuspa.destroy({
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
