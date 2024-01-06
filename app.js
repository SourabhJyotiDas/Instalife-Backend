import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import session from "express-session";
import passport from "passport";

const app = express();

dotenv.config({ path: "config/config.env" });

// Using Middlewares
app.use(
   session({
      secret: "mySecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
         secure: true,
         httpOnly: true,
         sameSite: "none",
      },
   })
);

connectPassport();

app.use(passport.session());
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.enable("trust proxy");

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

const corsOptions = {
   credentials: true,
   origin: ['https://instalife-in.netlify.app', 'http://localhost:3000'],
   methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));


app.get('/', async (req, res) => {
   res.send("<h1>Working Fine</h1>")
});

// importing Routes
import post from "./routes/post.js";
import user from "./routes/user.js";
import { connectPassport } from "./utils/Provider.js";

// usign Routes
app.use("/api/v1", post)
app.use("/api/v1", user)


export default app;