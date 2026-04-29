let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddEventBooking, getEventBooking } = require("../../controller/eventbooking.controller");


let router = express.Router();

router.post("/eventbooking",Authenticate,Authorize("user"),AddEventBooking);
router.get("/",Authenticate,Authorize("user"),getEventBooking);


module.exports = router;