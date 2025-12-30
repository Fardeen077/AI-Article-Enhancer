import mongoose from "mongoose";

const connectedDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB is connected Successfully : ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB is Not connected somethis is wrong", error.message);
        process.exit(1);
    }
}

export default connectedDb;