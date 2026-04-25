import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";

dotenv.config({path: "./env/.env"});
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});