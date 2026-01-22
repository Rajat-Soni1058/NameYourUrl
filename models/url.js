const mongoose=require("mongoose")

const urlschema = new mongoose.Schema({
    shortid:{
        type:String,
        unique:true,
        required:true,
    },
    redirecturl:{
        type:String,
        require:true,
    },
    visithistory:[{
        timestamp:{
            type:Number,
        }
    }
    ]

},{timestamps:true})
const Url=new mongoose.model("url",urlschema)
module.exports=Url;