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
    PF_UNI : {type: DataTypes.STRING(225) , allowNull: true},
UCC : {type: DataTypes.STRING(225) , allowNull: true},
SCRIP : {type: DataTypes.STRING(225) , allowNull: true},
ISIN : {type: DataTypes.STRING(225) , allowNull: true},
OPN_PF_QTY : {type: DataTypes.STRING(225) , allowNull: true},
CLS_PF_QTY : {type: DataTypes.STRING(225) , allowNull: true},
HOLDING_QTY : {type: DataTypes.STRING(225) , allowNull: true},
DIFF : {type: DataTypes.STRING(225) , allowNull: true},
NO_OF_DIFF : {type: DataTypes.STRING(225) , allowNull: true},
STATUS : {type: DataTypes.STRING(225) , allowNull: true},
kslucc : {type: DataTypes.STRING(225) , allowNull: true},
user_rem : {type: DataTypes.STRING(225) , allowNull: true},






    
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
  return sequelize.define("pfdiff", attributes, options);
}
