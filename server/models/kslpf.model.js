const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    DATE : { type: DataTypes.STRING(255), allowNull: true },
KUCC : { type: DataTypes.STRING(255), allowNull: true },
ISIN : { type: DataTypes.STRING(255), allowNull: true },
QTY : { type: DataTypes.FLOAT, allowNull: true },
RATE : { type: DataTypes.FLOAT, allowNull: true },
AMMOUNT : { type: DataTypes.FLOAT, allowNull: true },
SCRIPTNAME : { type: DataTypes.STRING(255), allowNull: true },
Subtranno : { type: DataTypes.STRING(255), allowNull: true },
Tran_type : { type: DataTypes.STRING(255), allowNull: true },
Sett_No : { type: DataTypes.STRING(255), allowNull: true },

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("kslpf", attributes, options);
}
