const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    name : { type: DataTypes.STRING(255), allowNull: true },
    code : { type: DataTypes.STRING(255), allowNull: true },
    tradedate : { type: DataTypes.STRING(255), allowNull: true },
    scripname : { type: DataTypes.STRING(255), allowNull: true },
    exchange : { type: DataTypes.STRING(255), allowNull: true },
    segment : { type: DataTypes.STRING(255), allowNull: true },
    buy_sell : { type: DataTypes.STRING(255), allowNull: true },
    rate : { type: DataTypes.FLOAT, allowNull: true },
    qty : { type: DataTypes.FLOAT, allowNull: true },
    stk : { type: DataTypes.FLOAT, allowNull: true },
    pre : { type: DataTypes.FLOAT, allowNull: true },
    remark : { type: DataTypes.STRING(255), allowNull: true },
    orderno  : { type: DataTypes.STRING(255), allowNull: true },
    tradeno  : { type: DataTypes.STRING(255), allowNull: true },
    usercode  : { type: DataTypes.STRING(255), allowNull: true },
    date : { type: DataTypes.STRING(255), allowNull: true },
    apaddress : { type: DataTypes.STRING(255), allowNull: true },
    apname  : { type: DataTypes.STRING(255), allowNull: true },
    avgprice : { type: DataTypes.FLOAT, allowNull: true },
    tradedqty : { type: DataTypes.FLOAT, allowNull: true },
    locnid : { type: DataTypes.STRING(255), allowNull: true },
    updatetime : { type: DataTypes.STRING(255), allowNull: true } ,
    entrytime : { type: DataTypes.STRING(255), allowNull: true },
    

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("dealslip", attributes, options);
}
