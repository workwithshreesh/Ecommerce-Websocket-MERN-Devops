const handleErrorRes = (res,  statusCode = 400, message) => {
    return res.status(statusCode).json({
        success: true,
        message: message
    })
}

module.exports = handleErrorRes;