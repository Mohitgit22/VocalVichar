import { NextFunction, Request, RequestHandler, Response } from "express";

const TryCatch = (handler : RequestHandler) : RequestHandler => {
    return async(req :Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next)
        } catch (error: any) {
            console.error("🚨 Error:", error); // Log full error
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message, // Include error message in response
            });
        }
    }
}
export default TryCatch;