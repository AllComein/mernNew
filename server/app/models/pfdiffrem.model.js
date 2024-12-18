module.exports = (sequelize, Sequelize) => {
    const pfdiffrem = sequelize.define("pfdiffrems", {
        UCC: {
        type: Sequelize.STRING
      },
      kslucc: {
        type: Sequelize.STRING
      },
      SCRIP: {
        type: Sequelize.STRING
      },
      ISIN: {
        type: Sequelize.STRING
      },
      OPN_PF_QTY: {
        type: Sequelize.STRING
      },
      CLS_PF_QTY: {
        type: Sequelize.STRING
      },
      HOLDING_QTY: {
        type: Sequelize.STRING
      },
      DIFF: {
        type: Sequelize.STRING
      },
      NO_OF_DIFF: {
        type: Sequelize.STRING
      },
      user_rem: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_data: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_date: {
        type: Sequelize.STRING,
        allowNull: true
      }
      
    },{ timestamps: false});
  
    return pfdiffrem;
  };
  