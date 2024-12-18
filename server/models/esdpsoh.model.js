const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // Id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    ucctext :{type: DataTypes.STRING(225) , allowNull: true},
    ucc :{type: DataTypes.STRING(225) , allowNull: true},
    bse_scrid :{type: DataTypes.STRING(225) , allowNull: true},
    nse_scrid :{type: DataTypes.STRING(225) , allowNull: true},
    isin :{type: DataTypes.STRING(225) , allowNull: true},
    exch :{type: DataTypes.STRING(225) , allowNull: true},
    acid :{type: DataTypes.STRING(225) , allowNull: true},
    boid :{type: DataTypes.STRING(225) , allowNull: true},
    psn :{type: DataTypes.STRING(225) , allowNull: true},
    qty :{type: DataTypes.STRING(225) , allowNull: true},
    stno :{type: DataTypes.STRING(225) , allowNull: true},
    ageing :{type: DataTypes.STRING(225) , allowNull: true},
    clgrate :{type: DataTypes.STRING(225) , allowNull: true},
    haircut :{type: DataTypes.STRING(225) , allowNull: true},
    cash_col :{type: DataTypes.STRING(225) , allowNull: true},
    ncash_col :{type: DataTypes.STRING(225) , allowNull: true},
    mktval :{type: DataTypes.STRING(225) , allowNull: true},
    pldg_seg :{type: DataTypes.STRING(225) , allowNull: true},
    tyopldg :{type: DataTypes.STRING(225) , allowNull: true},
    pldgexp :{type: DataTypes.STRING(225) , allowNull: true},
    corpact :{type: DataTypes.STRING(225) , allowNull: true},
    markrec :{type: DataTypes.STRING(225) , allowNull: true},
    loginid :{type: DataTypes.STRING(225) , allowNull: true},
    creatdt :{type: DataTypes.STRING(225) , allowNull: true},
    editdt :{type: DataTypes.STRING(225) , allowNull: true},
    kslucc :{type: DataTypes.STRING(225) , allowNull: true},
    



    
    // id: {type: DataTypes.INTEGER, allowNull: true , primaryKey: true,}
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("esdpsoh", attributes, options);
}
