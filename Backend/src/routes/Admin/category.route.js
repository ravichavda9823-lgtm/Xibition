let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddCatgory, getCategory, EditCategory, DeleteCategory } = require("../../controller/category.controller");
const upload = require("../../middleware/multer.middleware");

let router = express.Router();

router.post("/addcategory",Authenticate,Authorize("admin"),upload.single("image"),AddCatgory);
router.get("/",Authenticate,Authorize("admin"),getCategory);
router.put("/update/:id",Authenticate,Authorize("admin"),upload.single("image"),EditCategory);
router.delete("/delete/:id",Authenticate,Authorize("admin"),DeleteCategory);



module.exports = router;