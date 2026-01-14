const { success } = require('zod');
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function createAdminAccount() {
    try {
        // create admin
        const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await User.create({ name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, password: password, role: 'admin' });
        return { status: 200, success: true, message: 'Admin Created' };

    } catch (e) {
        console.log(e.message);
    }
}
async function checkAdminExist() {
    // check admin exist or not
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin?._id) {
        return { success: true, message: 'Admin already exist' };
    }
    return { success: false, message: 'Admin not exist' };
}

// IIFE fnc
(async () => {
  const response = await checkAdminExist();
  if (!response.success) {
    const res = await createAdminAccount();
    console.log(res);
  } 
})();

// module.exports = createAdminAccount;