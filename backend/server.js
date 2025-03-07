import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDB from "./database/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import staffRoute from "./routes/staff.route.js";
import questionPaperRoute from "./routes/questionpaper.route.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5500;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({
    origin: process.env.APPLICATION_URL,
    credentials: true
}));
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }))

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoute);
app.use("/api/questionpaper", questionPaperRoute);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
    //if you run the production build in the localhost change the NODE_ENV and use the below code instead of the above one
    // app.use(express.static(path.join(__dirname,"../frontend/dist")));
    // app.get("*",(req,res)=>{
    //     res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html"))
    // })
}

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});
