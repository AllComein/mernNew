

  // app/models/userRecord.model.js
module.exports = (sequelize, Sequelize) => {
    const UpdateCount = sequelize.define("UpdateCount", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            unique: true
          },
          count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          }
    },{ timestamps: false});
    return UpdateCount;
  };
  