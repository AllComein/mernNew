const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
 es_ucc :{type: DataTypes.STRING(225) , allowNull: true},
 symbol :{type: DataTypes.STRING(225) , allowNull: true},
clname :{type: DataTypes.STRING(225) , allowNull: true},
avgcost :{type: DataTypes.STRING(225) , allowNull: true},
bse_clrate :{type: DataTypes.STRING(225) , allowNull: true},
cost :{type: DataTypes.STRING(225) , allowNull: true},
mktvalue :{type: DataTypes.STRING(225) , allowNull: true},
unreal :{type: DataTypes.STRING(225) , allowNull: true},
mreturn :{type: DataTypes.STRING(225) , allowNull: true},
date :{type: DataTypes.STRING(225) , allowNull: true},
sqgain :{type: DataTypes.STRING(225) , allowNull: true},
delgain :{type: DataTypes.STRING(225) , allowNull: true},
location :{type: DataTypes.STRING(225) , allowNull: true},
locnid :{type: DataTypes.STRING(225) , allowNull: true},
instrument :{type: DataTypes.STRING(225) , allowNull: true},
ucc :{type: DataTypes.STRING(225) , allowNull: true},
isin :{type: DataTypes.STRING(225) , allowNull: true},
summed_p_qty :{type: DataTypes.STRING(225) , allowNull: true},
total_dpsoh :{type: DataTypes.STRING(225) , allowNull: true},
qty :{type: DataTypes.STRING(225) , allowNull: true},
beneficiary_qty :{type: DataTypes.STRING(225) , allowNull: true},
pledge_qty :{type: DataTypes.STRING(225) , allowNull: true},
occurrence_count :{type: DataTypes.STRING(225) , allowNull: true},
total_qty :{type: DataTypes.STRING(225) , allowNull: true},
comparison_result :{type: DataTypes.STRING(225) , allowNull: true},
mismatch_detail :{type: DataTypes.STRING(225) , allowNull: true},




// es_ucc: { type: DataTypes.STRING(255), allowNull: true },
// clname: { type: DataTypes.STRING(255), allowNull: true },
// avgcost: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// bse_clrate: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// cost: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// mktvalue: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// unreal: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// mreturn: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// date: { type: DataTypes.DATE, allowNull: true },  // Use DATE type instead of STRING
// sqgain: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// delgain: { type: DataTypes.DECIMAL(18, 3), allowNull: true },
// location: { type: DataTypes.STRING(255), allowNull: true },
// locnid: { type: DataTypes.STRING(255), allowNull: true },
// instrument: { type: DataTypes.STRING(255), allowNull: true },
// ucc: { type: DataTypes.STRING(255), allowNull: true },
// isin: { type: DataTypes.STRING(255), allowNull: true },
// summed_p_qty: { type: DataTypes.FLOAT, allowNull: true },  // Use FLOAT type
// total_dpsoh: { type: DataTypes.FLOAT, allowNull: true },  // Use FLOAT type
// qty: { type: DataTypes.FLOAT, allowNull: true },  // Use FLOAT type
// beneficiary_qty: { type: DataTypes.FLOAT, allowNull: true },  // Use FLOAT type
// pledge_qty: { type: DataTypes.FLOAT, allowNull: true },  // Use FLOAT type
// occurrence_count: { type: DataTypes.INTEGER, allowNull: true },  // Use INTEGER type
// total_qty: { type: DataTypes.FLOAT, allowNull: true },  // Use FLOAT type
// comparison_result: { type: DataTypes.STRING(50), allowNull: true },
// mismatch_detail: { type: DataTypes.STRING(255), allowNull: true },


  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("dpsohdiff", attributes, options);
}
