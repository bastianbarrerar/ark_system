const {sign, verify} = require('jsonwebtoken')

const createTokens = (user) =>{
    const accessToken =  sign({id: user.id}, process.env.ACCESS_TOKEN, { expiresIn: '5m'})
    return {accessToken: accessToken}
}


const validateToken = (req, res, next) =>{
    const accessToken = req.cookies['access-token']
    if(!accessToken) return res
      .status(400)
      .render("404", { title: "404", err: "user not authenticated" });
    try {
        const validateToken = verify(accessToken, process.env.ACCESS_TOKEN )
        if(validateToken){
            req.authenticated = true;
            return next()
        }
    } catch (err) {
        console.error(err)
    }
}

const checkAuthenticated = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (accessToken) {
    return res.redirect("home");
  } else {
    return next();
  }
};

const logOut = (req, res) => {
res.clearCookie("access-token");
res.redirect("/");
};

module.exports = {createTokens, validateToken, checkAuthenticated, logOut}