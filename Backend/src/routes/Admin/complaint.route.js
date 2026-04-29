let express = require("express");
const { Authenticate, Authorize } = require("../../middleware/auth.middleware");
const { getComplaints, DeleteComplaints, ReplyComplaints } = require("../../controller/complaint.controller");


let router = express.Router();

router.get("/",Authenticate,Authorize("admin"),getComplaints);
router.delete("/delete/:id",Authenticate,Authorize("admin"),DeleteComplaints);
router.put("/reply/:id", Authenticate,Authorize("admin"),ReplyComplaints);




module.exports = router;