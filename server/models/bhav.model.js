const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Co :{type: DataTypes.STRING(225) , allowNull: true},
    DATE :{type: DataTypes.STRING(225) , allowNull: true},
    ITEMCD :{type: DataTypes.STRING(225) , allowNull: true},
    isincd :{type: DataTypes.STRING(225) , allowNull: true},
    descr :{type: DataTypes.STRING(225) , allowNull: true},
    cSESSION :{type: DataTypes.STRING(225) , allowNull: true},
    PREV_SESS :{type: DataTypes.STRING(225) , allowNull: true},
    PREV_CLOSE :{type: DataTypes.STRING(225) , allowNull: true},
    OPEN_RATE :{type: DataTypes.STRING(225) , allowNull: true},
    HIGH_RATE :{type: DataTypes.STRING(225) , allowNull: true},
    LOW_RATE :{type: DataTypes.STRING(225) , allowNull: true},
    CLNG_RATE :{type: DataTypes.STRING(225) , allowNull: true},
    SETTL_RATE :{type: DataTypes.STRING(225) , allowNull: true},
    QTY_TRADED :{type: DataTypes.STRING(225) , allowNull: true},
    VALUE :{type: DataTypes.STRING(225) , allowNull: true},
    OPEN_INT :{type: DataTypes.STRING(225) , allowNull: true},
    CHANGE_INT :{type: DataTypes.STRING(225) , allowNull: true},
    UND_CLOSE :{type: DataTypes.STRING(225) , allowNull: true},
    LOT_QTY :{type: DataTypes.STRING(225) , allowNull: true},
    POE :{type: DataTypes.STRING(225) , allowNull: true},
    FXRATE :{type: DataTypes.STRING(225) , allowNull: true},
    





    

  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("bhav", attributes, options);
}
