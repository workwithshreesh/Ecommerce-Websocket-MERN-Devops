const handleSuccessRes = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: true,
        message: message
    })
}


module.exports = handleSuccessRes;