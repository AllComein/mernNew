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
   
    ClientCode :{type: DataTypes.STRING(225) , allowNull: true},
    ClientName :{type: DataTypes.STRING(225) , allowNull: true},
    ClientLocation :{type: DataTypes.STRING(225) , allowNull: true},
    Amount :{type: DataTypes.STRING(225) , allowNull: true},
    MAIN_CODE :{type: DataTypes.STRING(225) , allowNull: true},
    AP_NAME :{type: DataTypes.STRING(225) , allowNull: true},
    run_date :{type: DataTypes.STRING(225) , allowNull: true},
    locnid :{type: DataTypes.STRING(225) , allowNull: true},
    
    
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
  return sequelize.define("liqus", attributes, options);
}
