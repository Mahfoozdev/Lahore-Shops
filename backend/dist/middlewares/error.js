export const errorHandlerMiddleware = (err, req, res, next) => {
    err.message = err.message || "";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
export const TryCatchId = (controller) => {
    return (req, res, next) => {
        Promise.resolve(controller(req, res, next)).catch(next);
    };
};
