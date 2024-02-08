const bcrypt = require("bcrypt");

const saltRounds = 10;

const encPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    let message = "Encryption Failed";
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};

const verifyPassword = async (userPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Password comparison error:", error);
    let message = "Password comparison error";
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};

module.exports = { encPassword, verifyPassword };
