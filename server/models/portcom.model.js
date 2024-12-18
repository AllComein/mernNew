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
    es_ucc : { type: DataTypes.STRING(255), allowNull: true },
ucc : { type: DataTypes.STRING(255), allowNull: true },
clname : { type: DataTypes.STRING(255), allowNull: true },
symbol : { type: DataTypes.STRING(255), allowNull: true },
instrument : { type: DataTypes.STRING(255), allowNull: true },
option_typ : { type: DataTypes.STRING(255), allowNull: true },
sp : { type: DataTypes.STRING(255), allowNull: true },
expirydate : { type: DataTypes.STRING(255), allowNull: true },
qty : { type: DataTypes.STRING(255), allowNull: true },
avgcost : { type: DataTypes.STRING(255), allowNull: true },
cost : { type: DataTypes.STRING(255), allowNull: true },
mktvalue : { type: DataTypes.STRING(255), allowNull: true },
unreal : { type: DataTypes.STRING(255), allowNull: true },
mreturn : { type: DataTypes.STRING(255), allowNull: true },
date : { type: DataTypes.STRING(255), allowNull: true },
sqgain : { type: DataTypes.STRING(255), allowNull: true },
delgain : { type: DataTypes.STRING(255), allowNull: true },
location : { type: DataTypes.STRING(255), allowNull: true },
locnid : { type: DataTypes.STRING(255), allowNull: true },
isin : { type: DataTypes.STRING(255), allowNull: true },
exchange : { type: DataTypes.STRING(255), allowNull: true },
sc_shrtnm : { type: DataTypes.STRING(255), allowNull: true },
comn_sccd : { type: DataTypes.STRING(255), allowNull: true },
is_suspend : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
familygrp : { type: DataTypes.STRING(255), allowNull: true },

    
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
  return sequelize.define("portcom", attributes, options);
}
