const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };
    const compareUser = await User.findOne({
      where: { email: `${req.body.email}` },
    });
    if (compareUser === null) {
      await User.create(user);
      res.sendStatus(201)
    } else {
      res.sendStatus(202)
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).render('404', { title: "404", err: "couldn't process request"})
  }
};

const findAll = async (req, res) => {
  try {
    const info = await User.findAll({});
    res.status(200).json(info);
  } catch (err) {
    console.error(err.message);
    res.status(404).json(err);
  }
};

module.exports = {
  createUser,
  findAll,
};
