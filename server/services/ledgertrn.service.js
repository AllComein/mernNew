const db = require("../config/db");

const getAll = async () => {
  return await db.ledgertrn.findAll();
};

const findPersonById = async (id) => {
  return await db.ledgertrn.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.ledgertrn.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.ledgertrn.update(
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
  await db.ledgertrn.destroy({
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
