const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    DPNAME : { type: DataTypes.STRING(255), allowNull: true },
Bill_Date : { type: DataTypes.STRING(255), allowNull: true },
Subtranno : { type: DataTypes.STRING(255), allowNull: true },
Tran_type : { type: DataTypes.STRING(255), allowNull: true },
Sett_No : { type: DataTypes.STRING(255), allowNull: true },
commonscripcode : { type: DataTypes.STRING(255), allowNull: true },
deliv_qty : { type: DataTypes.FLOAT, allowNull: true },
tran_rate : { type: DataTypes.STRING(255), allowNull: true },
Amount : { type: DataTypes.FLOAT, allowNull: true },
isin : { type: DataTypes.STRING(255), allowNull: true },
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("removedboss", attributes, options);
}
