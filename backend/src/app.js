import express from "express";
import authRouter from "../routes/auth.routes.js";
import errorMiddleware from "../middlewares/error.middle.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.end("API is healthy");
});

app.use('/api/v1/auth', authRouter);
app.use(errorMiddleware);

export default app;