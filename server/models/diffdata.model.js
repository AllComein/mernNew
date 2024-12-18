const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    APP_PAN_NO :{type: DataTypes.STRING(225) , allowNull: true},
    ucc :{type: DataTypes.STRING(225) , allowNull: true},
    kslucc :{type: DataTypes.STRING(225) , allowNull: true},
    ks_kra :{type: DataTypes.STRING(225) , allowNull: true},
    status :{type: DataTypes.STRING(225) , allowNull: true},
updstatus :{type: DataTypes.STRING(225) , allowNull: true},
statusdate :{type: DataTypes.STRING(225) , allowNull: true},
updstatusdate :{type: DataTypes.STRING(225) , allowNull: true},
date :{type: DataTypes.STRING(225) , allowNull: true},
describe :{type: DataTypes.STRING(225) , allowNull: true},
result :{type: DataTypes.STRING(225) , allowNull: true},
APP_NAME :{type: DataTypes.STRING(225) , allowNull: true},
CombinedData_Email :{type: DataTypes.STRING(225) , allowNull: true},
Details_Email :{type: DataTypes.STRING(225) , allowNull: true},
Email_Comparison :{type: DataTypes.STRING(225) , allowNull: true},
CombinedData_Mobile :{type: DataTypes.STRING(225) , allowNull: true},
Details_Mobile :{type: DataTypes.STRING(225) , allowNull: true},
Mobile_Comparison :{type: DataTypes.STRING(225) , allowNull: true},
CombinedData_Address :{type: DataTypes.STRING , allowNull: true},
Details_Address :{type: DataTypes.STRING , allowNull: true},
Address_Comparison :{type: DataTypes.STRING(225) , allowNull: true},
CombinedData_DOB :{type: DataTypes.STRING(225) , allowNull: true},
Details_DOB :{type: DataTypes.STRING(225) , allowNull: true},
DOB_Comparison :{type: DataTypes.STRING(225) , allowNull: true},
CombinedData_Fathername	:{type: DataTypes.STRING(225) , allowNull: true},
Details_Fathername	:{type: DataTypes.STRING(225) , allowNull: true},
CombinedData_Pin	:{type: DataTypes.STRING(225) , allowNull: true},
Details_Pin	:{type: DataTypes.STRING(225) , allowNull: true},
Fathername_Comparison	:{type: DataTypes.STRING(225) , allowNull: true},
Pin_Comparison	:{type: DataTypes.STRING(225) , allowNull: true},

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("DifferencesData", attributes, options);
}
