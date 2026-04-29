let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddEvent, getEvents, EditEvent, DeleteEvent } = require("../../controller/event.controller");
const upload = require("../../middleware/multer.middleware");


let router = express.Router();

router.post(
  "/addevent",
  Authenticate,
  Authorize("admin"),
  upload.fields([
    { name: "event_img", maxCount: 1 },
    { name: "artist_image", maxCount: 1 },
  ]),
  AddEvent
);
router.get("/",Authenticate,Authorize("admin"),getEvents);
router.put(
  "/update/:id",
  upload.fields([
    { name: "event_img", maxCount: 1 },
    { name: "artist_image", maxCount: 1 },
  ]),
  EditEvent
);
router.delete("/delete/:id",Authenticate,Authorize("admin"),DeleteEvent);


module.exports = router;