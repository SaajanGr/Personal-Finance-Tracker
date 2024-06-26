import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usersRouter from "./routes/usersRouter.js";
import operationsRouter from "./routes/operationsRouter.js";
import cors from "cors";

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

const allowedDomains = ['http://localhost:3000'];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/", usersRouter);

app.use("/", operationsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Welcome to Personal Finance Tracker API");
});
