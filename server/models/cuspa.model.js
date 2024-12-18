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
    ClientCode : {type: DataTypes.STRING(225) , allowNull: true},
Clientlocation : {type: DataTypes.STRING(225) , allowNull: true},
ClientName : {type: DataTypes.STRING(225) , allowNull: true},
ComscripCode : {type: DataTypes.STRING(225) , allowNull: true},
ISIN : {type: DataTypes.STRING(225) , allowNull: true},
BalanceQty : {type: DataTypes.FLOAT , allowNull: true},
Rate : {type: DataTypes.FLOAT , allowNull: true},
Value : {type: DataTypes.FLOAT , allowNull: true},
TransferType : {type: DataTypes.STRING(225) , allowNull: true},
Franch_ID : {type: DataTypes.STRING(225) , allowNull: true},
run_date	: {type: DataTypes.STRING(225) , allowNull: true},
locnid	: {type: DataTypes.STRING(225) , allowNull: true},






    
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
  return sequelize.define("cuspa", attributes, options);
}
