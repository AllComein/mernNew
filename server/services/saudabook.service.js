const db = require("../config/db");

// const getAll = async () => {
//   return await db.saudabook.findAll();
// };


// const getAll = async () => {
//   return await db.saudabook.findAll({
//     // offset: (page - 1) * pageSize,
//     // limit: pageSize,
//     attributes: ["client_code","market_rate","trade_quantity","squp_delv_flag","brokerage_per_unit"], // Avoid large unnecessary fields
//     raw: true,  // Avoid Sequelize object overhead
//   });
// };


const getAll = async () => {
  const records = await db.saudabook.findAll({
    attributes: ["client_code","market_rate","trade_quantity","squp_delv_flag","brokerage_per_unit","cl_name","Clientlocation","locnid","trade_date","locnid"],
    raw: true,
  });

  return records.map(record => ({
    ...record,
    squp_delv_flag: Number(record.squp_delv_flag),  // Convert to number
  }));
};

const findPersonById = async (id) => {
  return await db.saudabook.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.saudabook.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.saudabook.update(
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
  await db.saudabook.destroy({
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
