import ApiError from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
    const message = {
        success: err.success || false,
        message: err.message || "Internal Server Error",
    };

    if (process.env.NODE_ENV === "development") {
        message.stack = err.stack;
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(message);
    }

    if (err.name === "ValidationError") {
        return res.status(400).json(message);
    }

    return res.status(500).json(message);
}

export default errorMiddleware;
