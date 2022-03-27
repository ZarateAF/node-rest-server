const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true, // <-- no longer necessary
            useUnifiedTopology: true, // <-- no longer necessary
        });
        console.log("DB online...")
    } catch (error) {
        console.log(error)
        throw new Error("DB Error")
    }
};

module.exports = {
  dbConnection,
};
