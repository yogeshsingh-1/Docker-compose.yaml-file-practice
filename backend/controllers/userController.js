const UserService = require('../services/userService');
const userValidation = require('../validation/userValidation');

async function createUser(req, res) {
    try {
        const body = req.body;
        const response = userValidation.signupbodyvalidation(body);
        console.log(response)
        if (!response) {
            return res.status(403).json({ success: false, message: 'Invalid Inputs' });
        }
        console.log(body);
        const { statusCode, success, message } = await UserService.createUser(body);
        return res.status(statusCode).json({ success, message });
    } catch (e) {
        return res.status(500).json({ message: 'Server side problem' });
    }
}

async function checkUser(req, res) {
    try {
        const { email, password } = req.body;
        const result = userValidation.signinbodyvalidation({ email, password });
        if (!result) {
            return res.status(403).json({ success: false, message: 'Invalid Inputs' });
        }
        const response = await UserService.checkUser({ email, password });
        if (!response.success) {
            return res.status(response.statusCode).json({ success: response.success, message: response.message })
        }
        return res.status(response.statusCode).json({ success: response.success, message: response.message, token: response.token })

    } catch (E) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}
module.exports = { createUser, checkUser };