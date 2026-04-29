let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const {  getEvents, getEventByCategory, AddEvent, getEventById } = require("../../controller/event.controller");


let router = express.Router();

router.post("/addevent",Authenticate,Authorize("user"),AddEvent);
router.get("/",getEvents);
router.get("/:id",Authenticate,Authorize("user"),getEventById);
router.get("/category/:category_id",Authenticate,Authorize("user"),getEventByCategory);

module.exports = router;