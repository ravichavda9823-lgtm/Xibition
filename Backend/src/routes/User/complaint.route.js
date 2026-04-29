let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { AddComplaint } = require("../../controller/complaint.controller");



let router = express.Router();

router.post("/addcomplaint",Authenticate,Authorize("user"),AddComplaint);


module.exports = router;