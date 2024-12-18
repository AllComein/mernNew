// const db = require("../models");
// const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;

// const Op = db.Sequelize.Op;

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");





// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//     rolename: req.body.rolename
//   })
//     .then(user => {
//       Role.findOne({
//         where: {
//           name: user.rolename
//         }
//       }).then(role => {
//         if (role) {
//           // Check if the user already has this role
//           user.getRoles().then(roles => {
//             if (roles.find(r => r.id === role.id)) {
//               // User already has this role, no need to set it again
//               res.send({ message: "User registered successfully!" });
//             } else {
//               // User doesn't have this role, so set it
//               user.setRoles([role.id]).then(() => {
//                 res.send({ message: "User registered successfully!" });
//               });
//             }
//           });
//         } else {
//           // user role = 1
//           user.setRoles([1]).then(() => {
//             res.send({ message: "User registered successfully!" });
//           });
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

// exports.signin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({
//       where: { username: username }
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the user has changed their password
//     if (user.changePassword) {
//       // Authenticate using the changed password
//       const passwordIsValid = bcrypt.compareSync(password, user.changePassword);
//       if (!passwordIsValid) {
//         return res.status(401).json({ message: 'Invalid Password!' });
//       }
//     } else {
//       // Authenticate using the regular password
//       const passwordIsValid = bcrypt.compareSync(password, user.password);
//       if (!passwordIsValid) {
//         return res.status(401).json({ message: 'Invalid Password!' });
//       }
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user.id }, config.secret, {
//       algorithm: 'HS256',
//       allowInsecureKeySizes: true,
//       expiresIn: 86400 // 24 hours
//     });

//     // Get user roles
//     const roles = await user.getRoles();
//     const authorities = roles.map(role => 'ROLE_' + role.name.toUpperCase());

//     // Return user data along with token
//     return res.status(200).json({
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       roles: authorities,
//       accessToken: token
//     });
//   } catch (error) {
//     console.error('Error during signin:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };


// exports.changePassword = async (req, res) => {
//   try {
//     const { username, oldPassword, newPassword } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ where: { username: username } });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the old password matches the current password
//     const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
//     if (!passwordIsValid) {
//       return res.status(401).json({ message: 'Old password is incorrect' });
//     }

//     // Hash the new password
//     const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

//     // Update user's password and changePassword field in the database
//     await user.update({
//       password: hashedNewPassword,
//       changePassword: newPassword // Store the new password in the changePassword field
//     });

//     return res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return res.status(500).json({ message: 'Error updating password' });
//   }
// };








// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//     rolename:req.body.rolename
//   })
//     .then(user => {
//       if (req.body.roles) {
//         Role.findAll({
//           where: {
//             name: {
//               [Op.or]: req.body.roles
//             }
//           }
//         }).then(roles => {
//           user.setRoles(roles).then(() => {
//             res.send({ message: "User registered successfully!" });
//           });
//         });
//       } else {
//         // user role = 1
//         user.setRoles([1]).then(() => {
//           res.send({ message: "User registered successfully!" });
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };








// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//     rolename: req.body.rolename
//   })
//     .then(user => {
//       Role.findOne({
//         where: {
//           name: user.rolename
//         }
//       }).then(role => {
//         if (role) {
//           user.setRoles([role.id]).then(() => {
//             res.send({ message: "User registered successfully!" });
//           });
//         } else {
//           // user role = 1
//           user.setRoles([1]).then(() => {
//             res.send({ message: "User registered successfully!" });
//           });
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };




// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }

//       const token = jwt.sign({ id: user.id },
//                               config.secret,
//                               {
//                                 algorithm: 'HS256',
//                                 allowInsecureKeySizes: true,
//                                 expiresIn: 86400, // 24 hours
//                               });

//       var authorities = [];
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }
//         res.status(200).send({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           roles: authorities,
//           accessToken: token
//         });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };



// exports.changePassword = (req, res) => {
//   const { id } = req.params;
//   const { newPassword } = req.body;

//   User.findByPk(id)
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User not found." });
//       }

//       // Generate hash for the new password
//       const hashedPassword = bcrypt.hashSync(newPassword, 8);

//       // Update the user's password with the new hashed password
//       user.update({
//         password: hashedPassword
//       })
//       .then(() => {
//         res.status(200).send({ message: "Password updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({ message: err.message });
//       });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };


// exports.changePassword = (req, res) => {
//   const { userId } = req.params;
//   const { oldPassword, newPassword } = req.body;

//   // Step 1: Find User
//   User.findById(userId)
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Step 2: Validate Password
//       bcrypt.compare(oldPassword, user.password, (err, result) => {
//         if (err) {
//           return res.status(500).json({ message: "Error comparing passwords" });
//         }
//         if (!result) {
//           return res.status(401).json({ message: "Old password is incorrect" });
//         }

//         // Step 3: Update Password
//         bcrypt.hash(newPassword, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({ message: "Error hashing password" });
//           }
//           user.password = hash;
//           user.save()
//             .then(() => {
//               return res.status(200).json({ message: "Password updated successfully" });
//             })
//             .catch(err => {
//               return res.status(500).json({ message: "Error saving user data" });
//             });
//         });
//       });
//     })
//     .catch(err => {


      
//       return res.status(500).json({ message: "Error finding user" });
//     });

//   }

// exports.changePassword = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { newPassword } = req.body;

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password in the database
//     user.password = hashedNewPassword;
//     await user.save();

//     return res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return res.status(500).json({ message: 'Error updating password' });
//   }
// };


// exports.changePassword = async (req, res) => {
//   try {
//     const userId = req.params.id; // Assuming userId is passed in the request params
//     const { oldPassword, newPassword } = req.body;

//     // Find the user by ID
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the old password matches the current password
//     const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
//     if (!passwordIsValid) {
//       return res.status(401).json({ message: 'Old password is incorrect' });
//     }

//     // Hash the new password
//     const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

//     // Update user's password in the database
//     await user.update({ password: hashedNewPassword });

//     return res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return res.status(500).json({ message: 'Error updating password' });
//   }
// };




const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Pfdiffrem = db.pfdiffrems;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { pfdiffrem } = require("../../config/db");



exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    rolename: req.body.rolename,
    changePassword: 'false' // Set changePassword to false when signing up
  })
  .then(user => {
    Role.findOne({
      where: {
        name: user.rolename
      }
    }).then(role => {
      if (role) {
        // Check if the user already has this role
        user.getRoles().then(roles => {
          if (roles.find(r => r.id === role.id)) {
            // User already has this role, no need to set it again
            res.send({ message: "User registered successfully!" });
          } else {
            // User doesn't have this role, so set it
            user.setRoles([role.id]).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          }
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};



exports.signin = async (req, res) => {
try {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({
    where: { username: username }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the user has changed their password
  if (user.changePassword) {
    // Authenticate using the changed password
    const passwordIsValid = bcrypt.compareSync(password, user.changePassword);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid Password!' });
    }
  } else {
    // Authenticate using the regular password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid Password!' });
    }
  }


  await user.update({
    showPassword: password // Assuming showPassword is a column in your User model
  });

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, config.secret, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true,
    expiresIn: 86400 // 24 hours
  });

  // Get user roles
  const roles = await user.getRoles();
  const authorities = roles.map(role => 'ROLE_' + role.name.toUpperCase());

  // Return user data along with token
  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: token
  });
} catch (error) {
  console.error('Error during signin:', error);
  return res.status(500).json({ message: 'Internal server error' });
}
};


exports.changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    // Find the user by username
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the old password matches the current password
    const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }
    // Hash the new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
    // Update user's password and changePassword field in the database
    await user.update({
      password: hashedNewPassword,
      showPassword: newPassword,
      changePassword: 'true' // Set changePassword to true when changing password
    });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Error updating password' });
  }
};


exports.forgotPassword = (req, res, next) => {

  //Check the form data is found or not
  if (isEmpty(req.body)) return next(new AppError('form data not found', 400));

  try {

      //Check the form data is valid or not
      const { error } = FORGOT_PASSWORD_MODEL.validate(req.body);

      if (error) return next(new AppError(error.details[0].message, 400));

      connection.query("SELECT * FROM user WHERE email = ?", [[req.body.email]], async (err, data1, fields) => {
          if (err) return next(new AppError(err, 500));

          if (data1.length == 0) {
              return next(new AppError("user not exist", 400))
          }

          const otp = Math.floor(1000 + Math.random() * 9000);

          const otpExpier = new Date();
          otpExpier.setMinutes(otpExpier.getMinutes() + 1);

          connection.query("UPDATE user SET otp = ?, otpExpire = ? WHERE email = ?", [otp, otpExpier, req.body.email], (err, data2, fields) => {
              if (err) return next(new AppError(err, 500));

              const transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL,
                    pass: process.env.WORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                  },
              });

              const mailOptions = {
                  from: 'mail3@eslemail.com',
                  to: req.body.email,
                  subject: 'Password reset OTP',
                  text: `Your OTP (It is expired after 1 min) : ${otp}`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return next(new AppError(error, 500));
                  } else {
                      res.json({
                          data: "Your OTP send to the email"
                      })
                  }
              });

          })

      })

  }
  catch (err) {
      return next(new AppError(err, 500));
  }
}

exports.user_resetPassword = (req, res, next) => {

  const body = req.body;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  if (isEmpty(body)) return next(new AppError('form data not found', 400));

  try {

      const { error } = RESET_PASSWORD_MODEL.validate(body);

      if (error) return next(new AppError(error.details[0].message, 400));

      if (password.localeCompare(confirmPassword) != 0) return next(new AppError('passwords are not equal', 400));

      connection.query("SELECT * FROM user WHERE otp = ? AND otpExpire > NOW()", [[body.otp]], async (err, data, fields) => {
          if (err) return next(new AppError(err, 500));

          if (data.length == 0) return next(new AppError('Invalid or expired OTP', 400));

          const solt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, solt);

          connection.query("UPDATE user SET password = ?, otp = null, otpExpire = null WHERE otp = ?", [hashedPassword, body.otp], async (err, data, fields) => {
              if (err) return next(new AppError(err, 500));

              res.json({
                  data: 'Password reset successful'
              })

          })

      })

  }
  catch (err) {
      return next(new AppError(err, 500));
  }

}






exports.updateUserEmail = async (req, res) => {
  try {
    const { username, newEmail } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = newEmail;
    await user.save();
    return res.status(200).json({ message: 'User email updated successfully' });
  } catch (error) {
    console.error('Error updating user email:', error);
    return res.status(500).json({ message: 'Error updating user email' });
  }
};



exports.updateUserDetails = async (req, res) => {
  try {
    const { username, email, newEmail, oldPassword, newPassword, changeType } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (changeType === 'email') {
      user.email = newEmail;
    } else if (changeType === 'password') {
      const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Old password is incorrect' });
      }
      const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
      user.password = hashedNewPassword;
    }

    await user.save();
    return res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    return res.status(500).json({ message: 'Error updating user details' });
  }
};


exports.updateUserRole = async (req, res) => {
  try {
    const { username, newRole } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = await Role.findOne({ where: { name: newRole } });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Check if the user already has this role
    const roles = await user.getRoles();
    if (roles.find(r => r.id === role.id)) {
      user.rolename = newRole;
      await user.save();
      // User already has this role, no need to set it again
      return res.status(200).json({ message: 'User role is already set to the new role' });
    } else {
      // User doesn't have this role, so set it
      await user.setRoles([role.id]);

      user.rolename = newRole;
      await user.save();

      return res.status(200).json({ message: 'User role updated successfully' });
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ message: 'Error updating user role' });
  }
};





exports.editUserRemark = async (req, res) => {
    try {
      const { id, user_rem , user_data,user_date } = req.body;
  
      // Find the remark with the provided ID
      let remark = await db.pfdiffrems.findOne({ where: { id: id } });
  
      if (!remark) {
        return res.status(404).json({ message: 'Remark not found' });
      }
  
      // If remark exists, update it
      await remark.update({ user_rem: user_rem ,user_data: user_data, user_date: user_date});
  
      return res.status(200).json({ message: 'User remark updated successfully' });
    } catch (error) {
      console.error('Error updating user remark:', error);
      return res.status(500).json({ message: 'Error updating user remark' });
    }
  };
  


// exports.updateUserRemark = async (req, res) => {
//   try {
//     const { UCC, ISIN, user_rem ,user_data,user_date } = req.body; // user_rem is now an array

//     // Check if the user with the provided UCC and ISIN exists
//     let user = await db.pfdiffrems.findOne({ where: { UCC: UCC, ISIN: ISIN } });

//     if (!user) {
//       // If user does not exist, create a new user
//       // user = await db.pfdiffrems.create({ UCC: UCC, ISIN: ISIN });
//       for (let i = 0; i < user_rem.length; i++) {
//         await db.pfdiffrems.create({UCC: UCC, ISIN: ISIN , user_rem: user_rem[i] });
//       }
//     }

//     // Iterate over the user_rem array and create a new row for each remark
//     for (let i = 0; i < user_rem.length; i++) {
//       await db.pfdiffrems.create({UCC: UCC, ISIN: ISIN , user_rem: user_rem[i] });
//     }
    

//     return res.status(200).json({ message: 'User remarks added successfully' });
//   } catch (error) {
//     console.error('Error updating user remarks:', error);
//     return res.status(500).json({ message: 'Error updating user remarks' });
//   }
// };






exports.updateUserRemark = async (req, res) => {
  try {
    const { UCC, ISIN,	kslucc,	SCRIP,	OPN_PF_QTY,	CLS_PF_QTY,	HOLDING_QTY,	DIFF,	NO_OF_DIFF, user_rem, user_data, user_date } = req.body; // user_rem, user_data, and user_date are now arrays

    // Check if the user with the provided UCC and ISIN exists
    let user = await db.pfdiffrems.findOne({ where: { UCC: UCC, ISIN: ISIN } });

    if (!user) {
      // If user does not exist, create a new user
      for (let i = 0; i < user_rem.length; i++) {
        await db.pfdiffrems.create({UCC: UCC, ISIN: ISIN ,kslucc : kslucc,	SCRIP : SCRIP,	OPN_PF_QTY : OPN_PF_QTY,	CLS_PF_QTY : CLS_PF_QTY,	HOLDING_QTY : HOLDING_QTY,	DIFF: DIFF,	NO_OF_DIFF : NO_OF_DIFF, user_rem: user_rem[i], user_data: user_data[i], user_date: user_date[i] });
      }
    }
else{
    // Iterate over the user_rem, user_data, and user_date arrays and create a new row for each remark, data, and date
    for (let i = 0; i < user_rem.length; i++) {
      await db.pfdiffrems.create({UCC: UCC, ISIN: ISIN ,kslucc : kslucc,	SCRIP : SCRIP,	OPN_PF_QTY : OPN_PF_QTY,	CLS_PF_QTY : CLS_PF_QTY,	HOLDING_QTY : HOLDING_QTY,	DIFF: DIFF,	NO_OF_DIFF : NO_OF_DIFF, user_rem: user_rem[i], user_data: user_data[i], user_date: user_date[i] });
    }
  }
    return res.status(200).json({ message: 'User remarks, data, and dates added successfully' });
  } catch (error) {
    console.error('Error updating user remarks:', error);
    return res.status(500).json({ message: 'Error updating user remarks' });
  }
};






// exports.updateUserOption = async (req, res) => {
//   try {
//     const { kslucc,Name,Pan,user_option,user_rem } = req.body; // user_rem, user_data, and user_date are now arrays

//     // Check if the user with the provided UCC and ISIN exists
//     let user = await db.askintrest.findOne({ where: { UCC: kslucc, Pan: Pan } });

//     if (!user) {
//       // If user does not exist, create a new user
//       for (let i = 0; i < user_rem.length; i++) {
//         await db.askintrest.create({UCC:kslucc,Name:Name,Pan:Pan,user_option:user_option[i],user_rem:user_rem[i] });
//       }
//     }
// else{
//     // Iterate over the user_rem, user_data, and user_date arrays and create a new row for each remark, data, and date
//     for (let i = 0; i < user_rem.length; i++) {
//       await db.askintrest.create({UCC:kslucc,Name:Name,Pan:Pan,user_option:user_option[i],user_rem:user_rem[i] });
//     }
//   }
//     return res.status(200).json({ message: 'User remarks, data, and dates added successfully' });
//   } catch (error) {
//     console.error('Error updating user remarks:', error);
//     return res.status(500).json({ message: 'Error updating user remarks' });
//   }
// };












exports.updateUserOption = async (req, res) => {
  try {
    const { kslucc, Name, Pan, user_option, user_rem, dphold, krastatus } = req.body;
    const todayDate = new Date(); // Get today's date

    // Check if the user with the provided UCC and Pan exists
    let user = await db.askintrest.findOne({ where: { Ucc: kslucc, Pan: Pan } });

    if (!user) {
      // If user does not exist, create a new user with a single record, storing options and remarks as JSON arrays
      await db.askintrest.create({
        Ucc: kslucc,
        Name: Name,
        Pan: Pan,
        user_option: user_option, 
        user_rem: user_rem,
        dphold: dphold,
        krastatus: krastatus,
        updatedate: todayDate, // Add today's date
      });
    } else {
      // If user exists, update the existing record
      await db.askintrest.update(
        {
          user_option: user_option, 
          user_rem: user_rem,
          updatedate: todayDate, // Update with today's date,
          krastatus: krastatus,
        },
        {
          where: { Ucc: kslucc, Pan: Pan },
        }
      );
    }

    return res.status(200).json({ message: 'User remarks and options updated successfully' });
  } catch (error) {
    console.error('Error updating user remarks:', error);
    return res.status(500).json({ message: 'Error updating user remarks' });
  }
};














// exports.updateUserOption = async (req, res) => {
//   try {
//     const { kslucc, Name, Pan, user_option, user_rem ,dphold,krastatus} = req.body;

//     // Check if the user with the provided UCC and ISIN exists
//     let user = await db.askintrest.findOne({ where: { Ucc: kslucc, Pan: Pan } });

//     if (!user) {
//       // If user does not exist, create a new user with a single record, storing options and remarks as JSON arrays
//       await db.askintrest.create({
//         Ucc: kslucc,
//         Name: Name,
//         Pan: Pan,
//         user_option:user_option, // Convert to JSON string
//         user_rem:user_rem, // Convert to JSON string
//         dphold:dphold,
//         krastatus:krastatus,
//       });
//     } else {
//       // If user exists, update the existing record
//       await db.askintrest.update(
//         {
//           user_option:user_option, // Convert to JSON string
//           user_rem:user_rem, // Convert to JSON string
//         },
//         {
//           where: { Ucc: kslucc, Pan: Pan },
//         }
//       );
//     }

//     return res.status(200).json({ message: 'User remarks and options updated successfully' });
//   } catch (error) {
//     console.error('Error updating user remarks:', error);
//     return res.status(500).json({ message: 'Error updating user remarks' });
//   }
// };










exports.editUserOption = async (req, res) => {
  try {
    const { id,user_option,user_rem } = req.body;

    // Find the remark with the provided ID
    let remark = await db.askintrest.findOne({ where: { id: id } });

    if (!remark) {
      return res.status(404).json({ message: 'Remark not found' });
    }

    // If remark exists, update it
    await remark.update({ user_rem: user_rem ,user_option: user_option});

    return res.status(200).json({ message: 'User remark updated successfully' });
  } catch (error) {
    console.error('Error updating user remark:', error);
    return res.status(500).json({ message: 'Error updating user remark' });
  }
};




exports.getAllOption = async (req, res) => {
  try {
    // Fetch all users from the database
    const user = await db.askintrest.findAll();
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};









exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};




exports.getAllRemark = async (req, res) => {
  try {
    // Fetch all users from the database
    const user = await db.pfdiffrems.findAll();
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};













exports.updateUserViewableUsers = async (req, res) => {
  try {
    const { username, viewableUsers } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert the array of usernames to a comma-separated string
    if (Array.isArray(viewableUsers)) {
      user.viewableUsers = viewableUsers.join(','); // Convert array to comma-separated string
    } else {
      return res.status(400).json({ message: 'viewableUsers must be an array' });
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Viewable users updated successfully' });
  } catch (error) {
    console.error('Error updating viewable users:', error);
    return res.status(500).json({ message: 'Error updating viewable users' });
  }
};






// exports.updateUserViewableUsers = async (req, res) => {
//   try {
//     const { username, viewableUsers } = req.body;

//     // Find the primary user by username
//     const primaryUser = await User.findOne({ where: { username } });

//     if (!primaryUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Ensure viewableUsers is an array
//     if (!Array.isArray(viewableUsers)) {
//       return res.status(400).json({ message: 'viewableUsers must be an array' });
//     }

//     // Update the primary user's viewableUsers field
//     primaryUser.viewableUsers = viewableUsers.join(','); // Convert array to comma-separated string
//     await primaryUser.save();

//     // Now, for each user in viewableUsers, update their viewableUsers to include the primary user's username
//     for (const viewableUsername of viewableUsers) {
//       const viewableUser = await User.findOne({ where: { username: viewableUsername } });

//       if (viewableUser) {
//         // Get the existing viewableUsers for this user, split them into an array
//         const currentViewable = viewableUser.viewableUsers ? viewableUser.viewableUsers.split(',') : [];

//         // Check if the primary user's username is already included, if not, add it
//         if (!currentViewable.includes(username)) {
//           currentViewable.push(username); // Add primary user (E640) to their viewableUsers list
//         }

//         // Update their viewableUsers field with the new list
//         viewableUser.viewableUsers = currentViewable.join(','); // Convert array back to a comma-separated string
//         await viewableUser.save();
//       }
//     }

//     return res.status(200).json({ message: 'Viewable users updated successfully' });
//   } catch (error) {
//     console.error('Error updating viewable users:', error);
//     return res.status(500).json({ message: 'Error updating viewable users' });
//   }
// };









// exports.updateUserViewableUsers = async (req, res) => {
//   try {
//     const { username, viewableUsers } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ where: { username } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Convert the array of usernames to a formatted string
//     if (Array.isArray(viewableUsers)) {
//       user.viewableUsers = viewableUsers.map(user => `"${user}"`).join(', '); // Format each username and join with a comma
//     } else {
//       return res.status(400).json({ message: 'viewableUsers must be an array' });
//     }

//     // Save the updated user
//     await user.save();

//     return res.status(200).json({ message: 'Viewable users updated successfully' });
//   } catch (error) {
//     console.error('Error updating viewable users:', error);
//     return res.status(500).json({ message: 'Error updating viewable users' });
//   }
// };




// exports.updateUserViewableUsers = async (req, res) => {
//   try {
//     const { username, viewableUsers } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ where: { username } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Ensure viewableUsers is an array and convert it to a JSON string
//     if (Array.isArray(viewableUsers)) {
//       user.viewableUsers = JSON.stringify(viewableUsers); // Convert array to JSON string
//     } else {
//       return res.status(400).json({ message: 'viewableUsers must be an array' });
//     }

//     // Save the updated user
//     await user.save();

//     return res.status(200).json({ message: 'Viewable users updated successfully' });
//   } catch (error) {
//     console.error('Error updating viewable users:', error);
//     return res.status(500).json({ message: 'Error updating viewable users' });
//   }
// };





exports.getViewableUsers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const viewableUsers = JSON.parse(user.viewableUsers || '[]');
    return res.status(200).json({ viewableUsers });
  } catch (error) {
    console.error('Error retrieving viewable users:', error);
    return res.status(500).json({ message: 'Error retrieving viewable users' });
  }
};
