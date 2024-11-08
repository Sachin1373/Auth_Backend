import mongoose from "mongoose";


const ConnectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log("DB CONNECTED SUCCESSFULY");
        
    } catch (error) {
        console.log("DB NOT CONNECTED!!!!",error);
        
    }
}

export default ConnectDB;