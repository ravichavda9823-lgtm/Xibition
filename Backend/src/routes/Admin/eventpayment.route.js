let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { Payment, getPayment } = require("../../controller/eventpayment.contoller");



let router = express.Router();

router.get("/",Authenticate,Authorize("user"),getPayment);


module.exports = router;