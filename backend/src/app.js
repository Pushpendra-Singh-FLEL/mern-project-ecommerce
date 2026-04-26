import express from "express";
import authRouter from "../routes/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.end("API is healthy");
});

app.use('/api/v1/auth', authRouter);

export default app;