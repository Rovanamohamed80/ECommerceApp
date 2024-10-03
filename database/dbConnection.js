import mongoose from "mongoose";

export const dbConnection = mongoose.connect(`mongodb+srv://ecommerce:URs5s3VoT5qJRExZ@cluster0.nvo9r1n.mongodb.net/ECommerceAPP`).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("failed",err);
})

