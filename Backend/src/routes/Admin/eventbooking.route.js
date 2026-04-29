let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getEventBooking, AddEventBooking, UpdateBookingStatus, DeleteBookingHistory } = require("../../controller/eventbooking.controller");


let router = express.Router();

router.get("/", Authenticate,Authorize("admin"),getEventBooking);
router.put("/status/:id",Authenticate, Authorize("admin"),UpdateBookingStatus)
router.delete("/delete/:id",Authenticate, Authorize("admin"),DeleteBookingHistory)



module.exports = router;