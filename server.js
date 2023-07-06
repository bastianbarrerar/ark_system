const { sequelize } = require("./app/config/db.config.js");
require("dotenv").config();
const { app } = require("./app.js");

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true, alter: true }); //true dev false prod
    app.listen(process.env.PORT, () => {
      console.log(`server listening to port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
