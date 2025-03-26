const db = require("../config/db");

const getAll = async () => {
  return await db.apsubbrokermain.findAll();
};

const findPersonById = async (id) => {
  return await db.apsubbrokermain.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.apsubbrokermain.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.apsubbrokermain.update(
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
  await db.apsubbrokermain.destroy({
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
