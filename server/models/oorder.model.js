const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Userid : { type: DataTypes.STRING(255), allowNull: true },
Client : { type: DataTypes.STRING(255), allowNull: true },
Group : { type: DataTypes.STRING(255), allowNull: true },
ClientOrderNo : { type: DataTypes.STRING(255), allowNull: true },
ExchangeCode : { type: DataTypes.STRING(255), allowNull: true },
MemberId : { type: DataTypes.STRING(255), allowNull: true },
TraderId : { type: DataTypes.STRING(255), allowNull: true },
InstrumentType : { type: DataTypes.STRING(255), allowNull: true },
InstrumentName : { type: DataTypes.STRING(255), allowNull: true },
Code : { type: DataTypes.STRING(255), allowNull: true },
Symbol_ScripId : { type: DataTypes.STRING(255), allowNull: true },
Ser_Exp_Group : { type: DataTypes.STRING(255), allowNull: true },
StrikePrice : { type: DataTypes.FLOAT, allowNull: true },
OptionType : { type: DataTypes.STRING(255), allowNull: true },
ScripName : { type: DataTypes.STRING(255), allowNull: true },
OrderType : { type: DataTypes.STRING(255), allowNull: true },
B_S : { type: DataTypes.STRING(255), allowNull: true },
PendingQuantity : { type: DataTypes.FLOAT, allowNull: true },
Price : { type: DataTypes.FLOAT, allowNull: true },
Spread : { type: DataTypes.STRING(255), allowNull: true },
TotalQuantity : { type: DataTypes.FLOAT, allowNull: true },
Pro_Cli : { type: DataTypes.STRING(255), allowNull: true },
ClientName : { type: DataTypes.STRING(255), allowNull: true },
Misc : { type: DataTypes.STRING(255), allowNull: true },
ExchOrdNo : { type: DataTypes.STRING(255), allowNull: true },
Status : { type: DataTypes.STRING(255), allowNull: true },
DisclosedQuantity : { type: DataTypes.STRING(255), allowNull: true },
Settlor : { type: DataTypes.STRING(255), allowNull: true },
Validity : { type: DataTypes.STRING(255), allowNull: true },
GoodTillDays_Date_Time : { type: DataTypes.STRING(255), allowNull: true },
MF_AON : { type: DataTypes.STRING(255), allowNull: true },
MFQuantity : { type: DataTypes.FLOAT, allowNull: true },
TriggerPrice : { type: DataTypes.FLOAT, allowNull: true },
CPBrokerId : { type: DataTypes.STRING(255), allowNull: true },
AuctionNo : { type: DataTypes.STRING(255), allowNull: true },
LastModifiedTime : { type: DataTypes.STRING(255), allowNull: true },
TotalExecutedQuantity : { type: DataTypes.FLOAT, allowNull: true },
AvgPrice : { type: DataTypes.FLOAT, allowNull: true },
Reason : { type: DataTypes.STRING(255), allowNull: true },
UserRemarks : { type: DataTypes.STRING(255), allowNull: true },
PartType : { type: DataTypes.STRING(255), allowNull: true },
Alias : { type: DataTypes.STRING(255), allowNull: true },
ProductType : { type: DataTypes.STRING(255), allowNull: true },
ServerEntryTime : { type: DataTypes.STRING(255), allowNull: true },
AMOOrderID : { type: DataTypes.STRING(255), allowNull: true },
OMSID : { type: DataTypes.STRING(255), allowNull: true },
GiveUpStatus : { type: DataTypes.STRING(255), allowNull: true },
EOMSID : { type: DataTypes.STRING(255), allowNull: true },
BookingRef : { type: DataTypes.STRING(255), allowNull: true },
DealingInstruction : { type: DataTypes.STRING(255), allowNull: true },
OrderInstruction : { type: DataTypes.STRING(255), allowNull: true },
PendingLots : { type: DataTypes.FLOAT, allowNull: true },
TotalLots : { type: DataTypes.FLOAT, allowNull: true },
TotalExecutedLots : { type: DataTypes.FLOAT, allowNull: true },
AliasSettlor : { type: DataTypes.STRING(255), allowNull: true },
AliasPartType : { type: DataTypes.STRING(255), allowNull: true },
Family : { type: DataTypes.STRING(255), allowNull: true },
InitiatedFrom : { type: DataTypes.STRING(255), allowNull: true },
ModifiedFrom : { type: DataTypes.STRING(255), allowNull: true },
Strategy : { type: DataTypes.STRING(255), allowNull: true },
Mapping : { type: DataTypes.STRING(255), allowNull: true },
InitiatedFromUserId : { type: DataTypes.STRING(255), allowNull: true },
ModifiedFromUserId : { type: DataTypes.STRING(255), allowNull: true },
SORId : { type: DataTypes.STRING(255), allowNull: true },
MaturityDate : { type: DataTypes.STRING(255), allowNull: true },
Yield : { type: DataTypes.STRING(255), allowNull: true },
COL : { type: DataTypes.STRING(255), allowNull: true },
SLPrice : { type: DataTypes.FLOAT, allowNull: true },
SLTriggerPrice : { type: DataTypes.FLOAT, allowNull: true },
SLJumpPrice : { type: DataTypes.FLOAT, allowNull: true },
LTPJumpPrice : { type: DataTypes.FLOAT, allowNull: true },
ProfitPrice : { type: DataTypes.FLOAT, allowNull: true },
LegIndicator : { type: DataTypes.STRING(255), allowNull: true },
BracketOrderStatus : { type: DataTypes.STRING(255), allowNull: true },
MappingOrderType : { type: DataTypes.STRING(255), allowNull: true },
AlgoType : { type: DataTypes.STRING(255), allowNull: true },
AlgoDescription : { type: DataTypes.STRING(255), allowNull: true },
Publisher : { type: DataTypes.STRING(255), allowNull: true },


    
    
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("oorder", attributes, options);
}
