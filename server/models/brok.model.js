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
    cpn  : {type: DataTypes.FLOAT , allowNull: true},
plname : {type: DataTypes.STRING(225) , allowNull: true},
aplevel : {type: DataTypes.STRING(225) , allowNull: true},
vertical : {type: DataTypes.STRING(225) , allowNull: true},
cd  : {type: DataTypes.FLOAT , allowNull: true},
ci  : {type: DataTypes.FLOAT , allowNull: true},
cmol  : {type: DataTypes.FLOAT , allowNull: true},
cpid  : {type: DataTypes.FLOAT , allowNull: true},
Futures  : {type: DataTypes.FLOAT , allowNull: true},
options  : {type: DataTypes.FLOAT , allowNull: true},
Derv  : {type: DataTypes.FLOAT , allowNull: true},
CF  : {type: DataTypes.FLOAT , allowNull: true},
CO  : {type: DataTypes.FLOAT , allowNull: true},
CP  : {type: DataTypes.FLOAT , allowNull: true},
CoF  : {type: DataTypes.FLOAT , allowNull: true},
CoO  : {type: DataTypes.FLOAT , allowNull: true},
CoD  : {type: DataTypes.FLOAT , allowNull: true},
CoP  : {type: DataTypes.FLOAT , allowNull: true},





    
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
  return sequelize.define("brokerage", attributes, options);
}
