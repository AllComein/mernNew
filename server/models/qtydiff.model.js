const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    KUCC :{type: DataTypes.STRING(225) , allowNull: true},
isin :{type: DataTypes.STRING(225) , allowNull: true},
kslpf_qty :{type: DataTypes.FLOAT , allowNull: true},
removedboss_qty :{type: DataTypes.FLOAT , allowNull: true},
qty_match :{type: DataTypes.STRING(225) , allowNull: true},
scriptname :{type: DataTypes.STRING(225) , allowNull: true},

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("qtydiff", attributes, options);
}
