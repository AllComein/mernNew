const db = require("../config/db");

const getAll = async () => {
  return await db.predetailss.findAll();
};

const findPersonById = async (id) => {
  return await db.predetailss.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.predetailss.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.predetailss.update(
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
  await db.predetailss.destroy({
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
