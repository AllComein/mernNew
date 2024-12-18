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
    ucc : {type: DataTypes.STRING(225) , allowNull: true},
brcd : {type: DataTypes.STRING(225) , allowNull: true},
kslucc : {type: DataTypes.STRING(225) , allowNull: true},
clname : {type: DataTypes.STRING(225) , allowNull: true},
locncd : {type: DataTypes.STRING(225) , allowNull: true},
pan_no : {type: DataTypes.STRING(225) , allowNull: true},
krapttdt1 : {type: DataTypes.STRING(225) , allowNull: true},
krasts1 : {type: DataTypes.STRING(225) , allowNull: true},
cpttsts1 : {type: DataTypes.STRING(225) , allowNull: true},
krapttrem1 : {type: DataTypes.STRING(225) , allowNull: true},
krapttdtlu : {type: DataTypes.STRING(225) , allowNull: true},
krastslu : {type: DataTypes.STRING(225) , allowNull: true},
cpttstslu : {type: DataTypes.STRING(225) , allowNull: true},
krapttrlu : {type: DataTypes.STRING(225) , allowNull: true},
kramatch : {type: DataTypes.STRING(225) , allowNull: true},
pttmatch : {type: DataTypes.STRING(225) , allowNull: true},






    
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
  return sequelize.define("ptt", attributes, options);
}
