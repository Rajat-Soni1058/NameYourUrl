

const short =require("shortid")
const Url=require("../models/url")
const port = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;
async function handlegenrateurl(req,res) {
    const body=req.body;
    // const shortid=short();

    if(!req.body||!body.originalurl||!body.userchoice){
        return res.render("home")
    }
    const shortid=body.userchoice;
    /////////////////
    try {
        // Check if short ID already exists
        const existing = await Url.findOne({ shortid: shortid })
        if (existing) {
            return res.render("home", {
                error: "This name is already taken! Try another name.",
                baseUrl: BASE_URL
            })
        }
    
    }
    catch(error){
        console.log(error);
    }

    await Url.create({
        shortid:shortid,//// enter the name given by user 
        redirecturl:body.originalurl,
        visithistory:[]

    })
    return res.render("home",{
        id:shortid,
        baseUrl:BASE_URL
    })
    
}




async function handleanalytics(req,res){
    const shortid=req.params.shortid;
    const doc=await Url.findOne({
        shortid:shortid
    })
    return res.json({totalvisit:doc.visithistory.length})
}
module.exports={
    handlegenrateurl,handleanalytics


}