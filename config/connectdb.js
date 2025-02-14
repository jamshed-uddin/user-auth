const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

module.exports = connectdb;
