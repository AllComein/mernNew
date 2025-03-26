const db = require("../config/db");

// const getAll = async () => {
//   return await db.saudabookcom.findAll();
// };



const getAll = async () => {
  const records = await db.saudabookcom.findAll({
    attributes: ["client_code","market_rate","trade_quantity","squp_delv_flag","brokerage_per_unit","cl_name","Clientlocation","locnid","instrument_type","trade_date","locnid"],
    raw: true,
  });

  return records.map(record => ({
    ...record,
    squp_delv_flag: Number(record.squp_delv_flag),  // Convert to number
  }));
};





const findPersonById = async (id) => {
  return await db.saudabookcom.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.saudabookcom.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.saudabookcom.update(
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
  await db.saudabookcom.destroy({
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
