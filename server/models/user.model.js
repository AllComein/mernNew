const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // Id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    name: { type: DataTypes.STRING(30), allowNull: false },
    // position: { 
    //   type: DataTypes.STRING(255), 
    //   allowNull: false, 
    //   get() {
    //     return this.getDataValue('position').split(';')
    //   },
    //   set(val) {
    //     if (Array.isArray(val)) {
    //       this.setDataValue('position', val.join(';'));
    //     } else {
    //       console.error('Expected an array for position');
    //     }
    //   },
    // },
    position: { type: DataTypes.STRING(30), allowNull: false },
    location: { type: DataTypes.STRING(30), allowNull: false },
    
  };
  /* by default it pluralize the model, so it will tread it as 'People' and query will be like
     select * from People  (if you have pre existing table Person, then it won't get records)
  */
  const options = {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  };
  return sequelize.define("record", attributes, options);
}
