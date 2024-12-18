const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    priority : { type: DataTypes.STRING(255), allowNull: true },
barcode : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
ucc : { type: DataTypes.STRING(255), allowNull: true },
kslucc : { type: DataTypes.STRING(255), allowNull: true },
clname : { type: DataTypes.STRING(255), allowNull: true },
panno : { type: DataTypes.STRING(255), allowNull: true },
ks_krasts : { type: DataTypes.STRING(255), allowNull: true },
ks_pttsts : { type: DataTypes.STRING(255), allowNull: true },
ks_krarem : { type: DataTypes.STRING(255), allowNull: true },
ks_emsent : { type: DataTypes.STRING(255), allowNull: true },
ks_emrecd : { type: DataTypes.STRING(255), allowNull: true },
ks_eslrm :{type: DataTypes.STRING(225) , allowNull: true},
ks_ltstrm :{type: DataTypes.STRING(225) , allowNull: true},
ks_emailid : { type: DataTypes.STRING(255), allowNull: true },
ks_mobile : { type: DataTypes.STRING(255), allowNull: true },
ks_emtocl : { type: DataTypes.STRING(255), allowNull: true },
ks_esign : { type: DataTypes.STRING(255), allowNull: true },
ks_essts : { type: DataTypes.STRING(255), allowNull: true },
bo_clsts : { type: DataTypes.STRING(255), allowNull: true },
sts1_3i : { type: DataTypes.STRING(255), allowNull: true },
sts2_3i : { type: DataTypes.STRING(255), allowNull: true },
ks_othsts : { type: DataTypes.STRING(255), allowNull: true },
mult_emmo : { type: DataTypes.STRING(255), allowNull: true },
ks_sts1 : { type: DataTypes.STRING(255), allowNull: true },
ks_allrem : { type: DataTypes.STRING(255), allowNull: true },
run_date : { type: DataTypes.STRING(255), allowNull: true },
ac_closed : { type: DataTypes.STRING(255), allowNull: true },
es_dpboid : { type: DataTypes.STRING(255), allowNull: true },
closer_trf : { type: DataTypes.STRING(255), allowNull: true },
es_locnid : { type: DataTypes.STRING(255), allowNull: true },
ks_lstrdt : { type: DataTypes.STRING(255), allowNull: true },
es_lstrdt : { type: DataTypes.STRING(255), allowNull: true },
ks_clsts : { type: DataTypes.STRING(255), allowNull: true },



  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("predetailsss", attributes, options);
}
