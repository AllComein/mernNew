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
kslucc : { type: DataTypes.STRING(255), allowNull: true },
clname : { type: DataTypes.STRING(255), allowNull: true },
panno : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
dptype : { type: DataTypes.STRING(255), allowNull: true },
hldgdt : { type: DataTypes.STRING(255), allowNull: true },
soh_brcd : { type: DataTypes.STRING(255), allowNull: true },
ks_dpid : { type: DataTypes.STRING(255), allowNull: true },
cldpid : { type: DataTypes.STRING(255), allowNull: true },
location : { type: DataTypes.STRING(255), allowNull: true },
locnid : { type: DataTypes.STRING(255), allowNull: true },
dpsts : { type: DataTypes.STRING(255), allowNull: true },
isin : { type: DataTypes.STRING(255), allowNull: true },
ks_dpsoh : { type: DataTypes.STRING(255), allowNull: true },
scrate : { type: DataTypes.STRING(255), allowNull: true },
dp_sohval : { type: DataTypes.STRING(255), allowNull: true },
cc_id : { type: DataTypes.STRING(255), allowNull: true },
bkflag : { type: DataTypes.STRING(255), allowNull: true },
bklkcd : { type: DataTypes.STRING(255), allowNull: true },
lkinreldt : { type: DataTypes.STRING(255), allowNull: true },
scrname : { type: DataTypes.STRING(255), allowNull: true },
bactype : { type: DataTypes.STRING(255), allowNull: true },
catgdespn : { type: DataTypes.STRING(255), allowNull: true },
comsccd : { type: DataTypes.STRING(255), allowNull: true },
bsecode : { type: DataTypes.STRING(255), allowNull: true },
nsesymbl : { type: DataTypes.STRING(255), allowNull: true },
dpidpri : { type: DataTypes.STRING(255), allowNull: true },
varvfodp : { type: DataTypes.STRING(255), allowNull: true },
sccatg : { type: DataTypes.STRING(255), allowNull: true },
cl_grp : { type: DataTypes.STRING(255), allowNull: true },

    
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
  return sequelize.define("dpsoh", attributes, options);
}
