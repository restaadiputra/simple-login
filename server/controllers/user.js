const User = require("../models").User;

module.exports = {
  list(_, res) {
    return User.findAll({
      include: [],
      order: [["createdAt", "DESC"]],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return User.findByPk(req.params.id, {
      include: [],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      email: req.body.email,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
    })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User.findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return user
          .update({
            name: req.body.name || user.name,
            first_name: req.body.first_name || user.first_name,
            last_name: req.body.last_name || user.last_name,
            date_of_birth: req.body.date_of_birth || user.date_of_birth,
            email: req.body.email || user.email,
            phone_number: req.body.phone_number || user.phone_number,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User.findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: "User Not Found",
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
