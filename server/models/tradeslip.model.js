const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    name :{type: DataTypes.STRING(225) , allowNull: true},
code :{type: DataTypes.STRING(225) , allowNull: true},
tradedate :{type: DataTypes.STRING(225) , allowNull: true},
scripname :{type: DataTypes.STRING(225) , allowNull: true},
exchange :{type: DataTypes.STRING(225) , allowNull: true},
segment :{type: DataTypes.STRING(225) , allowNull: true},
buy_sell :{type: DataTypes.STRING(225) , allowNull: true},
rate :{type: DataTypes.FLOAT , allowNull: true},
tradedqty :{type: DataTypes.FLOAT , allowNull: true},
stk :{type: DataTypes.FLOAT , allowNull: true},
pre :{type: DataTypes.FLOAT , allowNull: true},
amount :{type: DataTypes.FLOAT , allowNull: true},
// remark :{type: DataTypes.STRING(225) , allowNull: true},
orderno :{type: DataTypes.STRING(225) , allowNull: true},
tradeno :{type: DataTypes.STRING(225) , allowNull: true},
tradetime :{type: DataTypes.STRING(225) , allowNull: true},
locnid :{type: DataTypes.STRING(225) , allowNull: true},

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("tradeslip", attributes, options);
}
