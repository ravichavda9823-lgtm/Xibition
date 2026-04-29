let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getReview, DeleteReview, replyReview } = require("../../controller/review.controller");



let router = express.Router();


router.get("/",Authenticate,Authorize("admin"),getReview);
router.delete("/delete/:id",Authenticate,Authorize("admin"),DeleteReview);
router.put("/reply/:id", Authenticate,Authorize("admin"),replyReview);



module.exports = router;