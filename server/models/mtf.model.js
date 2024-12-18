const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {

    Symbol:{type: DataTypes.STRING(225) , allowNull: true},
    code:{type: DataTypes.STRING(225) , allowNull: true},
    Location:{type: DataTypes.STRING(225) , allowNull: true},
    ISIN:{type: DataTypes.STRING(225) , allowNull: true},
    Final_Qty:{type: DataTypes.STRING(225) , allowNull: true},
    Cost:{type: DataTypes.STRING(225) , allowNull: true},
    Final_Value:{type: DataTypes.STRING(225) , allowNull: true},
    Status_835_am:{type: DataTypes.STRING(225) , allowNull: true},
    MAIN_CODE:{type: DataTypes.STRING(225) , allowNull: true},
    AP_NAME:{type: DataTypes.STRING(225) , allowNull: true},
    run_date:{type: DataTypes.STRING(225) , allowNull: true},
    locnid:{type: DataTypes.STRING(225) , allowNull: true},
    

  };
 
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("mtf", attributes, options);
}
