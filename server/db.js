// db.js

// require("dotenv").config();

// const mssql = require("mssql");

// const config = {
//   server: process.env.DATABASE_HOST,
//   port: Number(process.env.DATABASE_PORT), // Convert string to number
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   pool: {
//     max: Number(process.env.DATABASE_CONNECTION_LIMIT), // Convert string to number
//   },
//   options: {
//     encrypt: false,
//   },
// };


// let db = {};

// db.connect = async () => {
//   const pool = await mssql.connect(config);
//   return pool;
// };
// db.get_user_by_email = async (email) => {
//   const pool = await db.connect();
//   const query = `SELECT email, id from users WHERE email = "${email}";`;
//   return pool.request().query(query);
// };

// db.update_forgot_password_token = (id, token) => {
//   const createdAt = new Date().toISOString();
//   const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString();
//   const query = `INSERT INTO reset_tokens(token, created_at, expires_at, user_id) VALUES('${token}', '${createdAt}', '${expiresAt}', ${id})`;
//   return execute(query);
// };

// db.get_password_reset_token = (id) => {
//   const query = `SELECT token, expires_at from reset_tokens WHERE user_id = ${id} ORDER BY created_at DESC LIMIT 1;`;
//   return execute(query);
// };

// db.update_password_reset_token = (id) => {
//   const query = `DELETE FROM reset_tokens WHERE user_id = ${id}`;
//   return execute(query);
// };

// db.update_user_password = (id, password) => {
//   const query = `UPDATE users SET password = '${password}' WHERE id = ${id}`;
//   return execute(query);
// };

// const execute = (query) => {
//   return new Promise((resolve, reject) => {
//     pool.query(query, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });
// };

// module.exports = db;

// require("dotenv").config();

// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     port: Number(process.env.SQL_PORT),
//     dialect: process.env.DIALECT,
//     dialectOptions: {
//       options: { encrypt: false },
//     },
//   }
// );

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   username: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING,
// }, {
//   tableName: 'users'
// });

// const ResetToken = sequelize.define('ResetToken', {
//   token: DataTypes.STRING,
//   createdAt: DataTypes.DATE,
//   expiresAt: DataTypes.DATE,
//   userId: DataTypes.INTEGER,
// }, {
//   tableName: 'reset_tokens'
// });

// User.hasMany(ResetToken, { foreignKey: 'userId' });
// ResetToken.belongsTo(User, { foreignKey: 'userId' });

// let db = {};

// db.connect = async () => {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// };

// // db.get_user_by_email = async (email) => {
// //   return User.findOne({ where: { email } });
// // };

// db.get_user_by_email = async (email) => {
//   const user = await User.findOne({ where: { email } });
//   if (user) {
//     return user;
//   } else {
//     throw new Error('User not found');
//   }
// };


// db.update_forgot_password_token = async (id, token) => {
//   const createdAt = new Date();
//   const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000);
//   return ResetToken.create({ token, createdAt, expiresAt, userId: id });
// };

// db.get_password_reset_token = async (id) => {
//   return ResetToken.findOne({ where: { userId: id }, order: [['createdAt', 'DESC']] });
// };

// db.update_password_reset_token = async (id) => {
//   return ResetToken.destroy({ where: { userId: id } });
// };

// db.update_user_password = async (id, password) => {
//   return User.update({ password }, { where: { id } });
// };

// sequelize.sync({ alter: true });

// module.exports = db;


require("dotenv").config();
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: Number(process.env.SQL_PORT),
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false ,  requestTimeout: 30000 },
    },
  }
);

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  Changepassword: Sequelize.STRING,
  rolename: Sequelize.STRING,
  showPassword: Sequelize.STRING,
  viewableUsers: Sequelize.STRING(2000),
  
}, {
  tableName: 'users'
});

const ResetToken = sequelize.define('ResetToken', {
  token: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  expiresAt: DataTypes.DATE,
  userId: DataTypes.INTEGER,
}, {
  tableName: 'reset_tokens'
});

User.hasMany(ResetToken, { foreignKey: 'userId' });
ResetToken.belongsTo(User, { foreignKey: 'userId' });

let db = {};

db.connect = async () => {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
};

db.get_user_by_email = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
};

db.update_forgot_password_token = async (id, token) => {
  const createdAt = new Date();
  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000);
  return ResetToken.create({ token, createdAt, expiresAt, userId: id });
};

db.get_password_reset_token = async (id) => {
  return ResetToken.findOne({ where: { userId: id }, order: [['createdAt', 'DESC']] });
};

db.update_password_reset_token = async (id) => {
  return ResetToken.destroy({ where: { userId: id } });
};

db.update_user_password = async (id, password) => {
  // const hashedPassword = bcrypt.hashSync(password, 8);
  return User.update({ password: password }, { where: { id } });
};

sequelize.sync({ alter: true });

module.exports = db;
