module.exports = (sequelize, Sequelize) => {
    const askintrest = sequelize.define("askintrest", {
      Ucc: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Pan: {
        type: Sequelize.STRING
      },
      user_option: {
        type: Sequelize.STRING
      },
      user_rem: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dphold: {
        type: Sequelize.STRING,
        allowNull: true
      },
      krastatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedate: {
        type: Sequelize.DATE,
        allowNull: true
      }
    },{ timestamps: false});
  
    return askintrest;
  };
  