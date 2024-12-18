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
    SNO : {type: DataTypes.FLOAT , allowNull: true},
    DATE : {type: DataTypes.STRING(225) , allowNull: true},
    Client_code : {type: DataTypes.STRING(225) , allowNull: true},
    Client_Name : {type: DataTypes.STRING(225) , allowNull: true},
    DP : {type: DataTypes.FLOAT , allowNull: true},
    Updation_type : {type: DataTypes.STRING(225) , allowNull: true},
    Query_ID : {type: DataTypes.FLOAT , allowNull: true},
    Query_Status : {type: DataTypes.STRING(225) , allowNull: true},
    Docs_Status : {type: DataTypes.STRING(225) , allowNull: true},
    Processed_by  : {type: DataTypes.STRING(225) , allowNull: true},
    POD : {type: DataTypes.FLOAT , allowNull: true},
    Courier : {type: DataTypes.STRING(225) , allowNull: true},
    Final_remarks : {type: DataTypes.STRING(225) , allowNull: true},
    run_date : {type: DataTypes.STRING(225) , allowNull: true},
    locnid : {type: DataTypes.STRING(225) , allowNull: true},
    





    
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
  return sequelize.define("crm", attributes, options);
}
