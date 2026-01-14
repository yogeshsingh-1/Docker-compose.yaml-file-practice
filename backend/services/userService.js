const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwtUtils');

class UserService {
  // Create User If Not Exist  OR SIGN UP
  async createUser(userData) {
    const { name, email, password, role = "customer" } = userData;
    const user = await this.verifyUser(email);
    if (user?._id) {
      return { success: false, statusCode: 403, message: 'User already exists' };
    }
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      await User.create({ name, email, password: hashPassword, role });
      return {
        success: true,
        statusCode: 200,
        message: 'User Created',
      };
    } catch (e) {
      return {
        success: false,
        statusCode: 500,
        message: 'Server Error',
      };
    }
  }

  // Verify The USer IF Exist OR SIGN IN
  async checkUser(userData) {
    try {
      const { email, password } = userData;
      const user = await this.verifyUser(email);
      if (!user) {
        return { success: false, statusCode: 403, message: 'User Not exists' };
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, statusCode: 403, message: 'Invalid Email Or Password' };
      }
      const token = generateToken(user);

      return { success: true, statusCode: 200, message: 'User Exists', token: token };
    } catch (e) {
      throw new Error("Invalid Credentials");
    }
  }
  // verify user exist or not
  async verifyUser(email) {
    return await User.findOne({ email });
  }
}
module.exports = new UserService();