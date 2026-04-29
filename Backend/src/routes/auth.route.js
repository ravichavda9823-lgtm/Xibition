let express = require("express");
const { Registration, Login, getLogin, getRegistration, toggleBlockUser, EditProfile } = require("../controller/auth.controller");
const { Authenticate, Authorize } = require("../middleware/auth.middleware");
let router = express.Router();

router.post("/signup",Registration);
router.post("/signin",Login);
router.get("/login",getLogin);
router.get("/",getRegistration);
router.put("/block/:id", toggleBlockUser);
router.put("/update/:id", EditProfile);



module.exports = router;