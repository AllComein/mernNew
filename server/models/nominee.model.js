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
    priority : { type: DataTypes.STRING(255), allowNull: true },
barcode : { type: DataTypes.STRING(255), allowNull: true },
brcd : { type: DataTypes.STRING(255), allowNull: true },
cl_grp : { type: DataTypes.STRING(255), allowNull: true },
ucc : { type: DataTypes.STRING(255), allowNull: true },
kslucc : { type: DataTypes.STRING(255), allowNull: true },
ksluccnm : { type: DataTypes.STRING(255), allowNull: true },
panno : { type: DataTypes.STRING(255), allowNull: true },
locnid : { type: DataTypes.STRING(255), allowNull: true },
ksemailid : { type: DataTypes.STRING(255), allowNull: true },
ksmobile : { type: DataTypes.STRING(255), allowNull: true },
es_nomn : { type: DataTypes.STRING(255), allowNull: true },
es_nompan : { type: DataTypes.STRING(255), allowNull: true },
es_nomshr : { type: DataTypes.STRING(255), allowNull: true },
es_relwapc : { type: DataTypes.STRING(255), allowNull: true },
ks_nomn : { type: DataTypes.STRING(255), allowNull: true },
ks_nompan : { type: DataTypes.STRING(255), allowNull: true },
ks_nomshr : { type: DataTypes.STRING(255), allowNull: true },
ks_relwapc : { type: DataTypes.STRING(255), allowNull: true },

    
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
  return sequelize.define("nominee", attributes, options);
}
