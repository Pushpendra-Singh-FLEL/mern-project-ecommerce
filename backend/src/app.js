import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
    res.end("API is healthy");
});

export default app;