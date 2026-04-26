import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandlers.js";
import ApiError from "../utils/errorHandler.js";

const verificationTokenMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized: Invalid token");
    }
    const token = authHeader.split(" ")[1];
    console.log(token)

    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err instanceof jsonwebtoken.TokenExpiredError) {
            throw new ApiError(401, "Unauthorized: Token expired");
        }
        if (err) {
            throw new ApiError(401, "Unauthorized: Invalid token");
        }
        return decoded;
    });
    req.user = decodedToken;
    next();
});

export default verificationTokenMiddleware;