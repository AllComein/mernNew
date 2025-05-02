const db = require("../config/db");

// const getAll = async () => {
//   return await db.stocklimits.findAll();
// };


// const getAll = async () => {
//   const records = await db.stocklimits.findAll({
//     attributes: ["Client_Code","Client_Name","locnid","ks_frccode","Normal_Ledger_Bal","Neo_RMS_Limit","F_and_O_Notional","Cash_Var_Margin","Derivatives_Span","Total_Span_Levied","Peak_Margin","MTF_Ledger_Bal","Fin_DrCr_NonMTF","Funded_Market_Value","MTF_Var_Margin","MTF_Mkt_Var_Margin","POA_Stocks","POA_Approved","POA_Non_Approved","Neo_RMS_Limit","POA_Stocks","POA_Approved","POA_Non_Approved","POA_B_Hcut","POA_B_Approved","MF_POA_Stock","Free_POA_Stocks","Free_POA_Approved","Free_POA_Non_Approved","Free_MF_POA_Stock","Free_MF_POA_BHcut","Free_POA_B_Hcut","Free_POA_B_Approved","Free_POA_B_Non_Approved"],
//     raw: true,
//   });

//   return records.map(record => ({
//     ...record,
//   }));
// };




const getAll = async () => {
  const records = await db.stocklimits.findAll({
    attributes: [
      "Client_Code", "Client_Name", "locnid", "ks_frccode","Date","panno",
      "Normal_Ledger_Bal", "Neo_RMS_Limit", "F_and_O_Notional",
      "Cash_Var_Margin", "Derivatives_Span", "Total_Span_Levied",
      "Peak_Margin", "MTF_Ledger_Bal", "Fin_DrCr_NonMTF",
      "Funded_Market_Value", "MTF_Var_Margin", "MTF_Mkt_Var_Margin",
      "POA_Stocks", "POA_Approved", "POA_Non_Approved",
      "POA_B_Hcut", "POA_B_Approved", "MF_POA_Stock",
      "Free_POA_Stocks", "Free_POA_Approved", "Free_POA_Non_Approved",
      "Free_MF_POA_Stock", "Free_MF_POA_BHcut", "Free_POA_B_Hcut",
      "Free_POA_B_Approved", "Free_POA_B_Non_Approved","Fut_Bill_DrCr","Original_Till_Date_Balance"
    ],
    raw: true,
  });

  return records.map(record => ({
    ...record,
    Normal_Ledger_Bal: parseFloat(record.Normal_Ledger_Bal),
    Neo_RMS_Limit: parseFloat(record.Neo_RMS_Limit),
    F_and_O_Notional: parseFloat(record.F_and_O_Notional),
    Cash_Var_Margin: parseFloat(record.Cash_Var_Margin),
    Derivatives_Span: parseFloat(record.Derivatives_Span),
    Total_Span_Levied: parseFloat(record.Total_Span_Levied),
    Peak_Margin: parseFloat(record.Peak_Margin),
    MTF_Ledger_Bal: parseFloat(record.MTF_Ledger_Bal),
    Fin_DrCr_NonMTF: parseFloat(record.Fin_DrCr_NonMTF),
    Funded_Market_Value: parseFloat(record.Funded_Market_Value),
    MTF_Var_Margin: parseFloat(record.MTF_Var_Margin),
    MTF_Mkt_Var_Margin: parseFloat(record.MTF_Mkt_Var_Margin),
    POA_Stocks: parseFloat(record.POA_Stocks),
    POA_Approved: parseFloat(record.POA_Approved),
    POA_Non_Approved: parseFloat(record.POA_Non_Approved),
    POA_B_Hcut: parseFloat(record.POA_B_Hcut),
    POA_B_Approved: parseFloat(record.POA_B_Approved),
    MF_POA_Stock: parseFloat(record.MF_POA_Stock),
    Free_POA_Stocks: parseFloat(record.Free_POA_Stocks),
    Free_POA_Approved: parseFloat(record.Free_POA_Approved),
    Free_POA_Non_Approved: parseFloat(record.Free_POA_Non_Approved),
    Free_MF_POA_Stock: parseFloat(record.Free_MF_POA_Stock),
    Free_MF_POA_BHcut: parseFloat(record.Free_MF_POA_BHcut),
    Free_POA_B_Hcut: parseFloat(record.Free_POA_B_Hcut),
    Free_POA_B_Approved: parseFloat(record.Free_POA_B_Approved),
    Free_POA_B_Non_Approved: parseFloat(record.Free_POA_B_Non_Approved),
    Fut_Bill_DrCr: parseFloat(record.Fut_Bill_DrCr),
    Original_Till_Date_Balance: parseFloat(record.Original_Till_Date_Balance),
  }));
};






const findPersonById = async (id) => {
  return await db.stocklimits.findByPk(id);
};

const createPerson = async ({ name, position , location }) => {
  const newPerson = await db.stocklimits.create({ name, position , location });
  return newPerson;
};

const updatePerson = async ({ name, position, location ,Id }) => {
  await db.stocklimits.update(
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
  await db.stocklimits.destroy({
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
