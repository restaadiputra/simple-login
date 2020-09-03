const User = require('../models').User;

module.exports = {
  login(req, res) {
    return User.findAll({
      where: {
        email: req.body.email,
      },
    })
      .then((users) => {
        if (users.length > 0) {
          return res.status(200).send({
            message: "Success"
          })
        } else {
          return res.status(404).send({
            message: "User Not Found",
          })
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
}