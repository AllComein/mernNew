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
    priority : { type: DataTypes.STRING(255), allowNull: true },
locnid : { type: DataTypes.STRING(255), allowNull: true },
barcode : { type: DataTypes.STRING(255), allowNull: true },
ucc : { type: DataTypes.STRING(255), allowNull: true },
kslucc : { type: DataTypes.STRING(255), allowNull: true },
panno : { type: DataTypes.STRING(255), allowNull: true },
clname : { type: DataTypes.STRING(255), allowNull: true },
ks_email : { type: DataTypes.STRING(255), allowNull: true },
ks_esign : { type: DataTypes.STRING(255), allowNull: true },
email : { type: DataTypes.STRING(255), allowNull: true },
mobile : { type: DataTypes.STRING(255), allowNull: true },
dob_doi : { type: DataTypes.STRING(255), allowNull: true },
uid : { type: DataTypes.STRING(255), allowNull: true },
ks_essts : { type: DataTypes.STRING(255), allowNull: true },
es_lstrdt : { type: DataTypes.STRING(255), allowNull: true },
cashcoll : { type: DataTypes.STRING(255), allowNull: true },
ncashcoll : { type: DataTypes.STRING(255), allowNull: true },
pledge_val : { type: DataTypes.STRING(255), allowNull: true },
es_ledbal : { type: DataTypes.STRING(255), allowNull: true },
es_margin : { type: DataTypes.STRING(255), allowNull: true },
opnpos_nfo : { type: DataTypes.STRING(255), allowNull: true },
es_dpledg : { type: DataTypes.STRING(255), allowNull: true },
es_tovr : { type: DataTypes.STRING(255), allowNull: true },
es_netbkg : { type: DataTypes.STRING(255), allowNull: true },
es_email : { type: DataTypes.STRING(255), allowNull: true },
es_mailid : { type: DataTypes.STRING(255), allowNull: true },
es_emsdt : { type: DataTypes.STRING(255), allowNull: true },
es_emssts : { type: DataTypes.STRING(255), allowNull: true },
closer_trf : { type: DataTypes.STRING(255), allowNull: true },
es_nomn : { type: DataTypes.STRING(255), allowNull: true },
es_nompan : { type: DataTypes.STRING(255), allowNull: true },
es_nomshr : { type: DataTypes.STRING(255), allowNull: true },
es_relwapc : { type: DataTypes.STRING(255), allowNull: true },
ks_nomn : { type: DataTypes.STRING(255), allowNull: true },
ks_nompan : { type: DataTypes.STRING(255), allowNull: true },
ks_nomshr : { type: DataTypes.STRING(255), allowNull: true },
ks_relwapc : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
cl_grp : { type: DataTypes.STRING(255), allowNull: true },
ks_dpid : { type: DataTypes.STRING(255), allowNull: true },
ksdp_boid : { type: DataTypes.STRING(255), allowNull: true },
catg : { type: DataTypes.STRING(255), allowNull: true },
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
  return sequelize.define("esign", attributes, options);
}
