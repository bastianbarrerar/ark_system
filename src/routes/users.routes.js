const userController = require('../controllers/user.controller');
const router = require("express").Router();

router.post("/add", userController.createUser);
router.post("/login", userController.logIn);
router.get("/", userController.findAll);


module.exports = router;
