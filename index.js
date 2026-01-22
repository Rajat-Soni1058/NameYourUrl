require('dotenv').config();
const express =require("express")
const app=express()
const path= require("path")
const Url=require("./models/url")
const port = process.env.PORT || 8000;
const handleroute=require("./routes/url")
const {connecttodb}=require("./connect")

connecttodb(process.env.MONGODB_URL).then(()=>{
    console.log("connected to db ")
})

const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.locals.baseUrl = BASE_URL
    next()
})


app.get("/",(req,res)=>{ 
    return res.status (200).render("home");
})
app.use("/url",handleroute)

// app.get("/:short",async (req,res)=>{
//     const shorturl=req.params.short;
//     const entry=await Url.findOneAndUpdate({
//         shortid:shorturl,
//     },{
//         $push:{
//             visithistory:{
//                 timestamp:Date.now(),
//             }
//         },
//     }
// )


// console.log("the line is executed")
// res.redirect(entry.redirecturl)
// }
// )
app.get("/:short", async (req, res) => {
    const shorturl = req.params.short;
    
    // CORRECT: Proper parentheses and { new: true }
    const entry = await Url.findOne({ shortid: shorturl })
    
    console.log("Database result:", entry);
    
    // CRITICAL: Check if entry exists!
    if (!entry) {
        console.log("URL not found:", shorturl);
        return res.status(404).send("URL not found");
    }
    
    //console.log("Redirecting to:", entry.redirecturl);
    res.redirect(entry.redirecturl);
});


app.listen (port,()=>{
    console.log("server is running ")
})
