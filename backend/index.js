import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config({path: "./env/.env"});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});