const User = require("../models/User");
const UserSession = require("../models/UserSession");
const { responseToSend } = require("../utils/api");

// api methods
async function register(req, res) {
    const { firstName = "", lastName = "", email = "", password = "", organization = "" } = req.body;

    // verify if user already exists
    const userExists = await getUserData({ email });
    if (userExists.success) {
        return responseToSend(res, {
            errors: ["Account already exists"]
        });
    }
    if (userExists.isServerError) {
        return responseToSend(res, {
            errors: [userExists.message]
        });
    }

    // Create User
    const newUser = new User({ firstName, lastName, email, password, organization });
    const invalidUser = newUser.validateSync();

    if (invalidUser) {
        let errMsgs = [];

        for (var err in invalidUser.errors) {
            if (invalidUser.errors.hasOwnProperty(err)) {
                errMsgs.push(invalidUser.errors[err].message);
            }
        }

        return responseToSend(res, { errors: errMsgs, message: "Unable to create user" });
    } else {
        // hash password and email
        newUser.password = newUser.generatePasswordHash(password);

        // Save User
        newUser.save((err, user) => {
            const responseData = err
                ? {
                    errors:
                        ["Server error. Couldn't create user. Please refresh the page and try again."]
                }
                : {
                    success: true,
                    message: "Success"
                };

            return responseToSend(res, responseData);
        });
    }
}
async function login(req, res) {
    const { password = "", email = "" } = req.body;

    if (!email) {
        return responseToSend(res, { errors: ["Please enter your email"] });
    }
    if (!password) {
        return responseToSend(res, { errors: ["Please enter your password"] });
    }

    const userCall = await getUserData({ email });
    if (userCall.success) {
        const { payload: user } = userCall;
        const { firstName, lastName } = user;

        if (!user.validPassword(password)) {
            return responseToSend(res, {
                errors: ["Invalid Password"]
            });
        }

        // Create new user session
        const userSession = new UserSession({
            userId: user._id
        });

        // Save user session
        userSession.save(async (err, doc) => {
            const responseData = err
                ? {
                    errors:
                        ["Error creating session. Please refresh the page and try again."]
                }
                : {
                    success: true,
                    message: "Valid Login",
                    payload: {
                        token: doc._id,
                        userData: {
                            firstName,
                            lastName,
                            email,
                            isOnline: true
                        }
                    }
                };

            if (responseData.success) {
                await setUserOnlineStatus({ email, status: true });
            }

            return responseToSend(res, responseData);
        });
    } else {
        // Error
        return responseToSend(res, userCall);
    }
}
async function verify(req, res) {
    const { token } = req.query;
    const validSession = await verifyUserSession(token);

    if (validSession.success) {
        const {
            success = false,
            message = "",
            payload: user
        } = await getUserData({ id: validSession.payload.userId });
        const responseData = success
            ? {
                success,
                payload: {
                    email: user.email,
                    organization: user.organization,
                    isOnline: user.isOnline
                }
            }
            : {
                errors: [message]
            };

        return responseToSend(res, responseData);
    } else {
        // Error
        return responseToSend(res, validSession);
    }
}

// Don't need to verify logout and deleteUser tokens as our middleware does it
async function logout(req, res) {
    const token = req.body.token || req.query.token;
    const userId = await getUserIdFromToken(token);
    const sessionDelete = await deleteSession(token);
    let responseData;

    if (sessionDelete.success) {
        responseData = {
            success: true,
            message: "Logged Out"
        }
        await setUserOnlineStatus({ id: userId, status: false });
    } else {
        responseData = sessionDelete;
    }

    return responseToSend(res, responseData);
}
async function deleteUser(req, res) {
    const token = req.body.token || req.query.token;
    const userId = await getUserIdFromToken(token);
    const allSessionDelete = await deleteAllSessions(userId);

    if (allSessionDelete.success) {
        // delete notes here as well
        return responseToSend(res, await deleteUserFromDb(userId));
    } else {
        return responseToSend(res, {
            errors:
                ["Server Error. Error deleting user. Please refresh the page and try again."]
        });
    }
}

// general functions
async function verifyUserSession(token) {
    if (!token) {
        return {
            message: "No token provided."
        };
    }

    try {
        return await UserSession.findById(token).then(session => {
            if (!session) throw "No session";
            return {
                success: true,
                payload: session
            };
        });
    } catch (e) {
        return {
            message: "No session found"
        };
    }
}
async function getUserData({ email = "", id = "" }) {
    try {
        const findBy = email.length !== 0 ? { email } : { _id: id };
        return await User.findOne(findBy).then(user => {
            if (!user) {
                return {
                    success: false,
                    message: "User doesn't exist."
                };
            }
            return {
                success: true,
                payload: user
            };
        });
    } catch (e) {
        return {
            success: false,
            isServerError: true,
            message:
                "Server Error. Couldn't find user. Please refresh the page and try again."
        };
    }
}
async function getUserIdFromToken(token) {
    try {
        const { userId } = await UserSession.findById(token);
        return userId;
    } catch (e) {
        return null;
    }
}
async function deleteSession(id) {
    try {
        return await UserSession.findOneAndDelete({
            _id: id
        }).then(session => {
            if (!session) throw "Error";
            return {
                success: true,
                message: "Session Deleted",
                userId: session.userId
            };
        });
    } catch (e) {
        return {
            success: false,
            errors: ["Server Error. Error deleting session."]
        };
    }
}
async function deleteAllSessions(userId) {
    try {
        return {
            success: true,
            payload: await UserSession.deleteMany({ userId: userId })
        };
    } catch (e) {
        return {
            success: false,
            errors: ["Server Error. Error deleting sessions."]
        };
    }
}
async function deleteUserFromDb(id) {
    try {
        return await User.findByIdAndDelete(id).then(user => {
            if (!user) throw "Error";
            return {
                success: true,
                message: "User Deleted"
            };
        });
    } catch (e) {
        return {
            message: "Server Error. Error deleting user."
        };
    }
}
async function setUserOnlineStatus({ email = "", id = "", status = false }) {
    let findBy = email.length !== 0 ? { email } : { _id: id };

    return await User.updateOne(findBy, { isOnline: status }, (err, doc) => {
        if (err) {
            return {
                success: false,
                message: err.message
            };
        }
        return {
            success: true
        };
    });
}

module.exports = {
    register,
    login,
    logout,
    verify,
    verifyUserSession,
    deleteUser,
    getUserData,
    getUserIdFromToken
};
