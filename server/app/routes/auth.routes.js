const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  // app.post("/api/auth/change-password", controller.changePassword);
  // app.post('/api/auth/changed-password', controller.changePassword);
    app.post('/api/auth/change-password', controller.changePassword);
    app.post('/api/auth/forgotPassword', controller.forgotPassword);

    app.put('/api/auth/updateUserDetails', controller.updateUserDetails);
    app.put('/api/auth/updateUserEmail',  controller.updateUserEmail);
    app.put('/api/auth/updateUserRole',  controller.updateUserRole);
    app.put('/api/auth/updateUserRemark',  controller.updateUserRemark);
    app.put('/api/auth/editUserRemark',  controller.editUserRemark);
    app.put('/api/auth/updateUserViewableUsers',  controller.updateUserViewableUsers);
    app.put('/api/auth/updateUserOption',  controller.updateUserOption);
    app.put('/api/auth/editUserOption',  controller.editUserOption);

    app.get('/api/auth/option',controller.getAllOption);
    app.get('/api/auth/users',controller.getAllUsers);
    app.get('/api/auth/remark',controller.getAllRemark);
    app.get('/api/auth/getViewableUsers',controller.getViewableUsers);
};
