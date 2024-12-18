const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    blnk1 : { type: DataTypes.STRING(255), allowNull: true },
trn_date : { type: DataTypes.STRING(255), allowNull: true },
trn_type : { type: DataTypes.STRING(255), allowNull: true },
sorc_clid : { type: DataTypes.STRING(255), allowNull: true },
sorc_clnm : { type: DataTypes.STRING(255), allowNull: true },
trgt_dpid : { type: DataTypes.STRING(255), allowNull: true },
trgt_clid : { type: DataTypes.STRING(255), allowNull: true },
trgt_clnm : { type: DataTypes.STRING(255), allowNull: true },
cmbpid : { type: DataTypes.STRING(255), allowNull: true },
isin_code : { type: DataTypes.STRING(255), allowNull: true },
sh_name : { type: DataTypes.STRING(255), allowNull: true },
quantity : { type: DataTypes.FLOAT, allowNull: true },
dr_cr : { type: DataTypes.STRING(255), allowNull: true },
mkttype : { type: DataTypes.STRING(255), allowNull: true },
stno : { type: DataTypes.STRING(255), allowNull: true },
value : { type: DataTypes.STRING(255), allowNull: true },
intrnl_rno : { type: DataTypes.STRING(255), allowNull: true },
trn_tdescn : { type: DataTypes.STRING(255), allowNull: true },
riskprof : { type: DataTypes.STRING(255), allowNull: true },
annincrng : { type: DataTypes.STRING(255), allowNull: true },
pep : { type: DataTypes.STRING(255), allowNull: true },
sorc_dpid : { type: DataTypes.STRING(255), allowNull: true },
nse_scrid : { type: DataTypes.STRING(255), allowNull: true },
bse_scrid : { type: DataTypes.STRING(255), allowNull: true },
markrec : { type: DataTypes.STRING(255), allowNull: true },
loginid : { type: DataTypes.STRING(255), allowNull: true },
creatdt : { type: DataTypes.STRING(255), allowNull: true },
editdt : { type: DataTypes.STRING(255), allowNull: true },
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("dptrans", attributes, options);
}
