function responseToSend(res, { success = false, message = "", errors = [], payload = {} }) {
    return res.json({
        success,
        message,
        errors,
        payload
    });
}

module.exports = {
    responseToSend
};
