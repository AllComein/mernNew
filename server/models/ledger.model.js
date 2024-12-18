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
    es_ucc : { type: DataTypes.STRING(255), allowNull: true },
ucc : { type: DataTypes.STRING(255), allowNull: true },
clname : { type: DataTypes.STRING(255), allowNull: true },
location : { type: DataTypes.STRING(255), allowNull: true },
locnid : { type: DataTypes.STRING(255), allowNull: true },
mcxledger : { type: DataTypes.STRING(255), allowNull: true },
ncdledger : { type: DataTypes.STRING(255), allowNull: true },
ncdsledger : { type: DataTypes.STRING(255), allowNull: true },
ledgbal : { type: DataTypes.STRING(255), allowNull: true },
tunbilled : { type: DataTypes.STRING(255), allowNull: true },
unclramt : { type: DataTypes.STRING(255), allowNull: true },
totalbal : { type: DataTypes.STRING(255), allowNull: true },
inimgn : { type: DataTypes.STRING(255), allowNull: true },
exposure : { type: DataTypes.STRING(255), allowNull: true },
additnal : { type: DataTypes.STRING(255), allowNull: true },
mtfundval : { type: DataTypes.STRING(255), allowNull: true },
netvalue : { type: DataTypes.STRING(255), allowNull: true },
jv150 : { type: DataTypes.STRING(255), allowNull: true },
pldgqp1p3 : { type: DataTypes.STRING(255), allowNull: true },
pldgqp2 : { type: DataTypes.STRING(255), allowNull: true },
security1 : { type: DataTypes.STRING(255), allowNull: true },
othmgn1 : { type: DataTypes.STRING(255), allowNull: true },
delvdamt : { type: DataTypes.STRING(255), allowNull: true },
pndgprfamt : { type: DataTypes.STRING(255), allowNull: true },
popndgamt : { type: DataTypes.STRING(255), allowNull: true },
tmargin : { type: DataTypes.STRING(255), allowNull: true },
netmargin : { type: DataTypes.STRING(255), allowNull: true },
nmgnboplg : { type: DataTypes.STRING(255), allowNull: true },
dpsohval : { type: DataTypes.STRING(255), allowNull: true },
mgnpostvr : { type: DataTypes.STRING(255), allowNull: true },
mgnpohc : { type: DataTypes.STRING(255), allowNull: true },
mgnpohcm : { type: DataTypes.STRING(255), allowNull: true },
vmlsmgnphc : { type: DataTypes.STRING(255), allowNull: true },
agegr5 : { type: DataTypes.STRING(255), allowNull: true },
exmargin : { type: DataTypes.STRING(255), allowNull: true },
dervmgn : { type: DataTypes.STRING(255), allowNull: true },
dpidsts : { type: DataTypes.STRING(255), allowNull: true },
dpidmapdf : { type: DataTypes.STRING(255), allowNull: true },
stsinbse : { type: DataTypes.STRING(255), allowNull: true },
stsinnse : { type: DataTypes.STRING(255), allowNull: true },
stsderveq : { type: DataTypes.STRING(255), allowNull: true },
stsnsecds : { type: DataTypes.STRING(255), allowNull: true },
resfdact1 : { type: DataTypes.STRING(255), allowNull: true },
resfdact2 : { type: DataTypes.STRING(255), allowNull: true },
lsttrddt : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
familygrp : { type: DataTypes.STRING(255), allowNull: true },
run_date : { type: DataTypes.STRING(255), allowNull: true },

    
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
  return sequelize.define("ledger", attributes, options);
}
