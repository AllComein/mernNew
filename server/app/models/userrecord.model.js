// app/models/userRecord.model.js
module.exports = (sequelize, Sequelize) => {
  const UserRecord = sequelize.define("userrecords", {
    username: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    panno: {
      type: Sequelize.STRING
    },
    kslucc: {
      type: Sequelize.STRING,
    },
    dpId: {
      type: Sequelize.STRING
    },
    incomeRange: {
      type: Sequelize.STRING
    },
    mailid: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },{ timestamps: false});


  return UserRecord;
};
