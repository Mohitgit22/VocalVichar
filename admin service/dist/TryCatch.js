const TryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            console.error("🚨 Error:", error); // Log full error
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message, // Include error message in response
            });
        }
    };
};
export default TryCatch;
