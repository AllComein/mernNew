const db = require("../config/db");

// const getAll = async () => {
//   return await db.dealslip.findAll();
// };


const getAll = async () => {
  const records = await db.dealslip.findAll({
    attributes: ["date"],
    raw: true,
  });

  return records.map(record => ({
    ...record,
    // squp_delv_flag: Number(record.squp_delv_flag),  // Convert to number
  }));
};

const findPersonById = async (id) => {
  return await db.dealslip.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.dealslip.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.dealslip.update(
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
  await db.dealslip.destroy({
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
