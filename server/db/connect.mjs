import mongoose from "mongoose";

//database connection with mongoose ODM
const dbConnection = async () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection established !");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default dbConnection;
