// requestHandler is function
//Why we need this? Answer:Bcz if that request fail then it will give error through this directly so we don't need to write catch in controller

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }

