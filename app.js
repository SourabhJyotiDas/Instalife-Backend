import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "config/config.env" });

// Using Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
   credentials: true,
   origin: ['https://instalife-in.netlify.app', 'http://localhost:3000'],
   methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.get('/', async (req, res) => {
   res.send("<h1>Working Fine</h1>")
});

// importing Routes
import post from "./routes/post.js";
import user from "./routes/user.js";

// usign Routes
app.use("/api/v1", post)
app.use("/api/v1", user)


export default app;