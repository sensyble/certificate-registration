import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Institute  } from "./models/institute.js";
import registerRoute from "./routes/registerRoute.js"
import loginRoute from "./routes/loginRoute.js"

import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send(`Hello from port ${PORT}`);
});

app.use("/register", registerRoute);
app.use("/login", loginRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB connection successful");
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
