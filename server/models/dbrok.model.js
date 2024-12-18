const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {

   brcd : {type: DataTypes.STRING(225) , allowNull: true},
ucc : {type: DataTypes.STRING(225) , allowNull: true},
kslucc : {type: DataTypes.STRING(225) , allowNull: true},
panno : {type: DataTypes.STRING(225) , allowNull: true},
locncd : {type: DataTypes.STRING(225) , allowNull: true},
segment : {type: DataTypes.STRING(225) , allowNull: true},
trd_type : {type: DataTypes.STRING(225) , allowNull: true},
dlysn : {type: DataTypes.STRING(225) , allowNull: true},
dlysm : {type: DataTypes.STRING(225) , allowNull: true},
dlysflrt : {type: DataTypes.STRING(225) , allowNull: true},
stlsn : {type: DataTypes.STRING(225) , allowNull: true},
stlsm : {type: DataTypes.STRING(225) , allowNull: true},
stlsflrt : {type: DataTypes.STRING(225) , allowNull: true},
dlydn : {type: DataTypes.STRING(225) , allowNull: true},
dlydm : {type: DataTypes.STRING(225) , allowNull: true},
dlydflrt : {type: DataTypes.STRING(225) , allowNull: true},
stldn : {type: DataTypes.STRING(225) , allowNull: true},
stldm : {type: DataTypes.STRING(225) , allowNull: true},
stldflrt : {type: DataTypes.STRING(225) , allowNull: true},
col1_a : {type: DataTypes.STRING(225) , allowNull: true},
dlysqon : {type: DataTypes.STRING(225) , allowNull: true},
dlysqom : {type: DataTypes.STRING(225) , allowNull: true},
modlysqo : {type: DataTypes.STRING(225) , allowNull: true},
stlsqon : {type: DataTypes.STRING(225) , allowNull: true},
stlsqom : {type: DataTypes.STRING(225) , allowNull: true},
mostlsqo : {type: DataTypes.STRING(225) , allowNull: true},
dlydlvn : {type: DataTypes.STRING(225) , allowNull: true},
dlydlvm : {type: DataTypes.STRING(225) , allowNull: true},
modlydlv : {type: DataTypes.STRING(225) , allowNull: true},
stldlvn : {type: DataTypes.STRING(225) , allowNull: true},
stldlvm : {type: DataTypes.STRING(225) , allowNull: true},
mostldlv : {type: DataTypes.STRING(225) , allowNull: true},
col1_b : {type: DataTypes.STRING(225) , allowNull: true},
ddlysqon : {type: DataTypes.STRING(225) , allowNull: true},
ddlysqom : {type: DataTypes.STRING(225) , allowNull: true},
dmodlysqo : {type: DataTypes.STRING(225) , allowNull: true},
dstlsqon : {type: DataTypes.STRING(225) , allowNull: true},
dstlsqom : {type: DataTypes.STRING(225) , allowNull: true},
dmostlsqo : {type: DataTypes.STRING(225) , allowNull: true},
ddlydlvn : {type: DataTypes.STRING(225) , allowNull: true},
ddlydlvm : {type: DataTypes.STRING(225) , allowNull: true},
dmodlydlv : {type: DataTypes.STRING(225) , allowNull: true},
dstldlvn : {type: DataTypes.STRING(225) , allowNull: true},
dstldlvm : {type: DataTypes.STRING(225) , allowNull: true},
dmostldlv : {type: DataTypes.STRING(225) , allowNull: true},





   
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("brok", attributes, options);
}
