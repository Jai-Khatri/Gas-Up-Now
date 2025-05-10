import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const ConnectTODB = async() => {

    try {

        const connection = await mongoose.connect(MONGODB_URL)

        if(connection){
            console.log("MongoDB cluster connected:- " , mongoose.connection.host)
        }
    } catch (error) {

        console.log("Error in connecting to MONGO Database :- " , error)
    }
}

export default ConnectTODB;