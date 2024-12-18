module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    rolename: {
      type: Sequelize.STRING
    },
    showPassword: {
      type: Sequelize.STRING
    },
    viewableUsers: {
      type: Sequelize.STRING(2000)
    }

  });

  return User;
};
