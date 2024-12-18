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
location : { type: DataTypes.STRING(255), allowNull: true },
locnid : { type: DataTypes.STRING(255), allowNull: true },
symbole : { type: DataTypes.STRING(255), allowNull: true },
expdate : { type: DataTypes.STRING(255), allowNull: true },
stkprice : { type: DataTypes.STRING(255), allowNull: true },
opttype : { type: DataTypes.STRING(255), allowNull: true },
purc_qty : { type: DataTypes.STRING(255), allowNull: true },
soldqty : { type: DataTypes.STRING(255), allowNull: true },
net_qty : { type: DataTypes.STRING(255), allowNull: true },
net_rate : { type: DataTypes.STRING(255), allowNull: true },
purc_amt : { type: DataTypes.STRING(255), allowNull: true },
sold_amt : { type: DataTypes.STRING(255), allowNull: true },
net_amt : { type: DataTypes.STRING(255), allowNull: true },
net_value : { type: DataTypes.STRING(255), allowNull: true },
exch_code : { type: DataTypes.STRING(255), allowNull: true },
scrprate : { type: DataTypes.STRING(255), allowNull: true },
futopt : { type: DataTypes.STRING(255), allowNull: true },
scripcd : { type: DataTypes.STRING(255), allowNull: true },
scripnm : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
familygrp : { type: DataTypes.STRING(255), allowNull: true },
run_date : { type: DataTypes.STRING(255), allowNull: true },

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
  return sequelize.define("netpo", attributes, options);
}
