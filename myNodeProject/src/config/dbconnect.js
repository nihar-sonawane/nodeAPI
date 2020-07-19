const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://imNihar:" +
        process.env.MONGO_PW +
        "@clustertemp.lkbev.mongodb.net/<dbname>?retryWrites=true&w=majority",
      {
        // useMongoClient: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((body) => {
      console.log("Mongo Connected for myNodeProject...");
    });
};

mongoose.Promise = global.Promise;

module.exports = connectDB;
