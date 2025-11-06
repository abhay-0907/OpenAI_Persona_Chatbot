import mongoose from "mongoose";
import 'dotenv/config';
const connection = async()=>{
    try {
        const host = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected ${host.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connection;