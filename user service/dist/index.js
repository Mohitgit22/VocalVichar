import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './route.js';
dotenv.config();
const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            dbName: "VocalVichar"
        });
        console.log("Mongo DB connected in user service successfully");
    }
    catch (error) {
        console.log("Issue in connnected to mongo db of user service");
        console.log(error);
    }
};
const app = express();
app.use(express.json());
app.use('/api/v1/', userRoutes);
app.get("/", (req, res) => {
    res.send("Server is listening");
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDb();
});
