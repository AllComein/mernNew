const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
priority :{type: DataTypes.STRING(225) , allowNull: true},
brcd :{type: DataTypes.STRING(225) , allowNull: true},
rundate :{type: DataTypes.STRING(225) , allowNull: true},
panno :{type: DataTypes.STRING(225) , allowNull: true},
ucc :{type: DataTypes.STRING(225) , allowNull: true},
barcode :{type: DataTypes.STRING(225) , allowNull: true},
uccname :{type: DataTypes.STRING(225) , allowNull: true},
bo_clsts :{type: DataTypes.STRING(225) , allowNull: true},
gender :{type: DataTypes.STRING(225) , allowNull: true},
dob_doi :{type: DataTypes.STRING(225) , allowNull: true},
m_status :{type: DataTypes.STRING(225) , allowNull: true},
fahugunm :{type: DataTypes.STRING(225) , allowNull: true},
add_line1 :{type: DataTypes.STRING(225) , allowNull: true},
add_line2 :{type: DataTypes.STRING(225) , allowNull: true},
add_line3 :{type: DataTypes.STRING(225) , allowNull: true},
add_city :{type: DataTypes.STRING(225) , allowNull: true},
pin_code :{type: DataTypes.STRING(225) , allowNull: true},
add_stat :{type: DataTypes.STRING(225) , allowNull: true},
add_cntry :{type: DataTypes.STRING(225) , allowNull: true},
eckyc_no :{type: DataTypes.STRING(225) , allowNull: true},
email :{type: DataTypes.STRING(225) , allowNull: true},
mobile :{type: DataTypes.STRING(225) , allowNull: true},
natnl :{type: DataTypes.STRING(225) , allowNull: true},
natnldesc :{type: DataTypes.STRING(225) , allowNull: true},
gr_annrng :{type: DataTypes.STRING(225) , allowNull: true},
gr_annasdt :{type: DataTypes.STRING(225) , allowNull: true},
occn :{type: DataTypes.STRING(225) , allowNull: true},
bnk_nm1 :{type: DataTypes.STRING(225) , allowNull: true},
bnk_acno1 :{type: DataTypes.STRING(225) , allowNull: true},
bnk_acty1 :{type: DataTypes.STRING(225) , allowNull: true},
bnk_bradd1 :{type: DataTypes.STRING(225) , allowNull: true},
bank_city :{type: DataTypes.STRING(225) , allowNull: true},
bank_ifsc :{type: DataTypes.STRING(225) , allowNull: true},
bank_micr :{type: DataTypes.STRING(225) , allowNull: true},
es_nomn :{type: DataTypes.STRING(225) , allowNull: true},
es_nomshr :{type: DataTypes.STRING(225) , allowNull: true},
es_relwapc :{type: DataTypes.STRING(225) , allowNull: true},
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("esldump", attributes, options);
}
