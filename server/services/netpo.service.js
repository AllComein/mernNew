const db = require("../config/db");

const getAll = async () => {
  return await db.netpo.findAll();
};

const findPersonById = async (id) => {
  return await db.netpo.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.netpo.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.netpo.update(
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
  await db.netpo.destroy({
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
