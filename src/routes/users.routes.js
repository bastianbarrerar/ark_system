const userController = require('../controllers/user.controller');
const router = require("express").Router();

router.post("/add", userController.createUser);
router.get("/", userController.findAll);


module.exports = router;
