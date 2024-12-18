const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    es_locnid :{type: DataTypes.STRING(225) , allowNull: true},
brcd :{type: DataTypes.STRING(225) , allowNull: true},
ucc :{type: DataTypes.STRING(225) , allowNull: true},
kslucc :{type: DataTypes.STRING(225) , allowNull: true},
clname :{type: DataTypes.STRING(225) , allowNull: true},
ks_panno :{type: DataTypes.STRING(225) , allowNull: true},
ks_krasts :{type: DataTypes.STRING(225) , allowNull: true},
ks_pttsts :{type: DataTypes.STRING(225) , allowNull: true},
locationid :{type: DataTypes.STRING(225) , allowNull: true},
ks_emailid :{type: DataTypes.STRING(225) , allowNull: true},
ks_mobile :{type: DataTypes.STRING(225) , allowNull: true},
ks_ledgerbal :{type: DataTypes.STRING(225) , allowNull: true},
ks_lstrdt :{type: DataTypes.STRING(225) , allowNull: true},
ks_introdt :{type: DataTypes.STRING(225) , allowNull: true},
days_from_today :{type: DataTypes.INTEGER , allowNull: true},
date_used :{type: DataTypes.STRING(225) , allowNull: true},

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("kslledger", attributes, options);
}
