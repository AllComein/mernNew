const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
exchcode :{type: DataTypes.STRING(225) , allowNull: true},
cli_cod :{type: DataTypes.STRING(225) , allowNull: true},
lgr_date :{type: DataTypes.STRING(225) , allowNull: true},
vouch_no :{type: DataTypes.STRING(225) , allowNull: true},
narr :{type: DataTypes.STRING(225) , allowNull: true},
trn_type :{type: DataTypes.STRING(225) , allowNull: true},
cheq_no :{type: DataTypes.STRING(225) , allowNull: true},
dr_amt :{type: DataTypes.STRING(225) , allowNull: true},
cr_amt :{type: DataTypes.STRING(225) , allowNull: true},
cum_bal :{type: DataTypes.STRING(225) , allowNull: true},
intamt :{type: DataTypes.STRING(225) , allowNull: true},
docno :{type: DataTypes.STRING(225) , allowNull: true},
eslucc :{type: DataTypes.STRING(225) , allowNull: true},
locnid :{type: DataTypes.STRING(225) , allowNull: true},
ks_locnid :{type: DataTypes.STRING(225) , allowNull: true},
clname :{type: DataTypes.STRING(225) , allowNull: true},

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("ledgertrn", attributes, options);
}
