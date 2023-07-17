const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createTokens } = require('../../JWT')
const cookieParser = require("cookie-parser");


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

const logIn = async (req, res) =>{
  try {
    const { email, password } = req.body
    const user = await User.findOne({where: { email: email}})
    if(!user) {
      res.sendStatus(403)
    }
    else{
      if(await bcrypt.compare(password, user.password)){
        const { accessToken } = createTokens(user);
        res.cookie("access-token", accessToken, { 
          httpOnly: true,
          maxAge: 1000 * 60 * 5,
          // secure: true,
          // signed: true
        })
          
        return  res.redirect("/home");

   }
   else{
        res.sendStatus(403)
      }
    } }catch (err) {
    console.error(err.message);
   res
     .status(404)
     .render("404", { title: "404", err: "couldn't process request" });
  }
}


//just for dev, prod must be deleted
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
  logIn
};
