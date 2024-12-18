const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // Id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    ClientId : {type: DataTypes.STRING(225) , allowNull: true},
cl_name : {type: DataTypes.STRING(225) , allowNull: true},
NetBal : {type: DataTypes.FLOAT , allowNull: true},
group_id : {type: DataTypes.STRING(225) , allowNull: true},
Location : {type: DataTypes.STRING(225) , allowNull: true},
FmlyCount : {type: DataTypes.FLOAT , allowNull: true},
FmlyBal : {type: DataTypes.FLOAT , allowNull: true},
FirstCrBalDt : {type: DataTypes.STRING(225) , allowNull: true},
FirstCrBal : {type: DataTypes.FLOAT , allowNull: true},
AsOnDate : {type: DataTypes.STRING(225) , allowNull: true},
AsOnBal : {type: DataTypes.FLOAT , allowNull: true},
InitialMarg : {type: DataTypes.FLOAT , allowNull: true},
UnBilledVallanDr : {type: DataTypes.FLOAT , allowNull: true},
NetCr : {type: DataTypes.FLOAT , allowNull: true},
SettlDrBal : {type: DataTypes.STRING(225) , allowNull: true},
SettlDate : {type: DataTypes.STRING(225) , allowNull: true},
MF : {type: DataTypes.STRING(225) , allowNull: true},
Collateral : {type: DataTypes.FLOAT , allowNull: true},
LatestRectPay : {type: DataTypes.FLOAT , allowNull: true},
CashMargin : {type: DataTypes.FLOAT , allowNull: true},
NetReceipt : {type: DataTypes.FLOAT , allowNull: true},
ProvInterest : {type: DataTypes.FLOAT , allowNull: true},
ProvDPCharges : {type: DataTypes.FLOAT , allowNull: true},
BSESTARMFOpeningbalance : {type: DataTypes.FLOAT , allowNull: true},
BSESTARMFSIPdueAmount : {type: DataTypes.FLOAT , allowNull: true},
BSESTARMFNetopeningBalance : {type: DataTypes.FLOAT , allowNull: true},
SharePledge_repledge : {type: DataTypes.FLOAT , allowNull: true},
FO : {type: DataTypes.FLOAT , allowNull: true},
CDS : {type: DataTypes.FLOAT , allowNull: true},
MCX : {type: DataTypes.FLOAT , allowNull: true},
NCDEX : {type: DataTypes.FLOAT , allowNull: true},
Column1 : {type: DataTypes.FLOAT , allowNull: true},
RAL : {type: DataTypes.STRING(225) , allowNull: true},
locnid : {type: DataTypes.STRING(225) , allowNull: true},






    
    // id: {type: DataTypes.INTEGER, allowNull: true , primaryKey: true,}
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("sebi", attributes, options);
}
