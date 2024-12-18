exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.sub_adminBoard = (req, res) => {
  res.status(200).send("Sub Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.sub_moderatorBoard = (req, res) => {
  res.status(200).send("Sub Moderator Content.");
};