let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getCategory, AddCatgory } = require("../../controller/category.controller");

let router = express.Router();

router.post("/addcategory",Authenticate,Authorize("user"),AddCatgory);
router.get("/",getCategory);

module.exports = router;