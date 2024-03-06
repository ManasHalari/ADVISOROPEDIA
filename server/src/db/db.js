import mongoose  from "mongoose";


export const connectedDB= async ()=>{
        try {
            const connect=await mongoose.connect(`${process.env.MONGODB_URI}/ADVISOROPEDIA`)
            console.log(`MongoDb Connected Successfully ${connect.connection.host}`)
        } catch (error) {
            console.error("DB FAIED",error);
            process.exit(1)
        }

}