const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    AP_Regd :{type: DataTypes.STRING(225) , allowNull: true},
    KS_MainCode :{type: DataTypes.STRING(225) , allowNull: true},
    MainCode_Name :{type: DataTypes.STRING(225) , allowNull: true},
    Branch :{type: DataTypes.STRING(225) , allowNull: true},
    LocationId :{type: DataTypes.STRING(225) , allowNull: true},
    KS_CLNTSts :{type: DataTypes.STRING(225) , allowNull: true},
    PanNo :{type: DataTypes.STRING(225) , allowNull: true},
    KS_emailId :{type: DataTypes.STRING(225) , allowNull: true},
    Ks_MobileNo :{type: DataTypes.STRING(225) , allowNull: true},
    KS_DPID :{type: DataTypes.STRING(225) , allowNull: true},
    KS_DPBOID :{type: DataTypes.STRING(225) , allowNull: true},
    KS_CLNT_Introduction_Date :{type: DataTypes.STRING(225) , allowNull: true},
    KS_MTF_ACTV :{type: DataTypes.STRING(225) , allowNull: true},
    KS_NSE_CM :{type: DataTypes.STRING(225) , allowNull: true},
    KS_BSE_CM :{type: DataTypes.STRING(225) , allowNull: true},
    KS_NSE_FO :{type: DataTypes.STRING(225) , allowNull: true},
    KS_NSE_CDS :{type: DataTypes.STRING(225) , allowNull: true},
    KS_MCX :{type: DataTypes.STRING(225) , allowNull: true},
    KS_NCDEX :{type: DataTypes.STRING(225) , allowNull: true},
    Ks_TradingPlatForm :{type: DataTypes.STRING(225) , allowNull: true},
    KS_ClntType :{type: DataTypes.STRING(225) , allowNull: true},
    KS_CLNT_USERID :{type: DataTypes.STRING(225) , allowNull: true},
    KS_QS_FO_RAL :{type: DataTypes.STRING(225) , allowNull: true},
    KS_QS_CM_RAL :{type: DataTypes.STRING(225) , allowNull: true},
    Franchise_Code :{type: DataTypes.STRING(225) , allowNull: true},
    Franchise_Name :{type: DataTypes.STRING(225) , allowNull: true},
    State :{type: DataTypes.STRING(225) , allowNull: true},
    Dealing_Zone :{type: DataTypes.STRING(225) , allowNull: true},
    Bank_Name :{type: DataTypes.STRING(225) , allowNull: true},
    Bank_AccountNo :{type: DataTypes.STRING(225) , allowNull: true},
    IFSC_Code :{type: DataTypes.STRING(225) , allowNull: true},
    Bank_Branch :{type: DataTypes.STRING(225) , allowNull: true},
    CorrAddress1 :{type: DataTypes.STRING(225) , allowNull: true},
    CorrAddress2 :{type: DataTypes.STRING(225) , allowNull: true},
    CorrAddress3 :{type: DataTypes.STRING(225) , allowNull: true},
    CorrAddress4 :{type: DataTypes.STRING(225) , allowNull: true},
    CorrCity :{type: DataTypes.STRING(225) , allowNull: true},
    CorrState :{type: DataTypes.STRING(225) , allowNull: true},
    CorrPin :{type: DataTypes.STRING(225) , allowNull: true},
    CorrCountry :{type: DataTypes.STRING(225) , allowNull: true},
    RunDate :{type: DataTypes.STRING(225) , allowNull: true},

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("apsubbrokermain", attributes, options);
}
