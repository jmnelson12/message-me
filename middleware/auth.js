const { verifyUserSession } = require("../controllers/user.controller");
const { responseToSend } = require('../utils/api');

async function isAuthenticated(req, res, next) {
    const token = req.body.token || req.params.token || req.query.token || null;

    if (!token) {
        return responseToSend(res, {
            errors: ["Not Authorized. Please login or create an account."]
        });
    }

    try {
        await verifyUserSession(token).then(_res => {
            if (_res.success) {
                next();
            } else {
                return responseToSend(res, {
                    errors: ["Not Authorized. Please login or create an account."]
                })
            }
        });
    } catch (e) {
        return responseToSend(res, {
            errors: ["Error authenticating user"]
        });
    }
}

module.exports = isAuthenticated;
