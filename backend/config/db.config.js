import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config({ path: "./env/.env" });
const dnsServers = process.env.DNS_SERVERS
    ?.split(",")
    .map(server => server.trim())
    .filter(Boolean) || ['127.0.0.1']; // Default to localhost if no servers provided
    
dns.setServers(dnsServers);

export default (connectDB) => (
    async function (
        retries = parseInt(process.env.RETRIES) || 5,
        retryDelay = parseInt(process.env.RETRY_DELAY) || 5000) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await mongoose.connect(process.env.MONGO_URI);
                console.log("MongoDB connected successfully");
                return; // Exit the function if connection is successful
            } catch (error) {
                console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
                if (attempt < retries) {
                    console.log(`Retrying in ${retryDelay}ms...`);
                    await new Promise(res => setTimeout(res, retryDelay));
                }
            }
        }
        console.error("All MongoDB connection attempts failed. Exiting.");
        process.exit(1); // Exit the process if all attempts fail
    })();