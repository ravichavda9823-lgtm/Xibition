let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddReview } = require("../../controller/review.controller");


let router = express.Router();

router.post("/addreview",Authenticate,Authorize("user"),AddReview);


module.exports = router;