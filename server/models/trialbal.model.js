const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    locn_cd :{type: DataTypes.STRING(225) , allowNull: true},
brcd :{type: DataTypes.STRING(225) , allowNull: true},
brname :{type: DataTypes.STRING(225) , allowNull: true},
locn_id :{type: DataTypes.STRING(225) , allowNull: true},
eslucc :{type: DataTypes.STRING(225) , allowNull: true},
ks_ucc :{type: DataTypes.STRING(225) , allowNull: true},
clname :{type: DataTypes.STRING(225) , allowNull: true},
ledg_bal :{type: DataTypes.STRING(225) , allowNull: true},
mtf_fndbl :{type: DataTypes.STRING(225) , allowNull: true},
accrd_int :{type: DataTypes.STRING(225) , allowNull: true},
open_obl :{type: DataTypes.STRING(225) , allowNull: true},
unclr_cq :{type: DataTypes.STRING(225) , allowNull: true},
net_ledbal :{type: DataTypes.STRING(225) , allowNull: true},
tot_mgn :{type: DataTypes.STRING(225) , allowNull: true},
nlb_mgn :{type: DataTypes.STRING(225) , allowNull: true},
nrml_coll :{type: DataTypes.STRING(225) , allowNull: true},
mtf_fndstk :{type: DataTypes.STRING(225) , allowNull: true},
mtf_mtmdif :{type: DataTypes.STRING(225) , allowNull: true},
dpbo_hldg :{type: DataTypes.STRING(225) , allowNull: true},
mf_sgb_tb :{type: DataTypes.STRING(225) , allowNull: true},
delvd_amt :{type: DataTypes.STRING(225) , allowNull: true},
tot_soh :{type: DataTypes.STRING(225) , allowNull: true},
netmargin :{type: DataTypes.STRING(225) , allowNull: true},
nmgnboplg :{type: DataTypes.STRING(225) , allowNull: true},
auc_jv150 :{type: DataTypes.STRING(225) , allowNull: true},
mcxledger :{type: DataTypes.STRING(225) , allowNull: true},
ncdledger :{type: DataTypes.STRING(225) , allowNull: true},
ncdsledger :{type: DataTypes.STRING(225) , allowNull: true},
sno :{type: DataTypes.STRING(225) , allowNull: true},


  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("trialbal", attributes, options);
}
