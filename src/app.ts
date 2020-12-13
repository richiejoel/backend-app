import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import path from 'path';
import passportMiddleware from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import specialRoutes from './routes/special.routes';

//initializations
const app = express();

//settings
app.set("port", process.env.PORT || 3000);


//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(passport.initialize());
passport.use(passportMiddleware);
app.disable('etag');


//routes
app.get("/", (req, res) => {
    res.send(`The api initial is por ${app.get("port")} `);
});

// this folders for this application will be used to store public file images
app.use("/uploads",express.static("uploads"));



app.use(authRoutes);
app.use(specialRoutes);


export default app;