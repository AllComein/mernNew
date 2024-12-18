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
nse : { type: DataTypes.STRING(255), allowNull: true },
qty : { type: DataTypes.STRING(255), allowNull: true },
cost_rate : { type: DataTypes.STRING(255), allowNull: true },
mtf_value : { type: DataTypes.STRING(255), allowNull: true },
symbol : { type: DataTypes.STRING(255), allowNull: true },
isin : { type: DataTypes.STRING(255), allowNull: true },
co_sccode : { type: DataTypes.STRING(255), allowNull: true },
bse : { type: DataTypes.STRING(255), allowNull: true },
bse_sers : { type: DataTypes.STRING(255), allowNull: true },
nse_sers : { type: DataTypes.STRING(255), allowNull: true },
odin_sccd : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
familygrp : { type: DataTypes.STRING(255), allowNull: true },
scrname : { type: DataTypes.STRING(255), allowNull: true },
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
  return sequelize.define("mtfpo", attributes, options);
}
