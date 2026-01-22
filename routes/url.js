const express=require("express")
const router=express.Router();
const {handlegenrateurl,handleanalytics}=require("../controllers/user")


router.route("/").post(handlegenrateurl)
router.route("/analytics/:shortid").get(handleanalytics)
module.exports=router;