import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/connect.mjs";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//for starting the app along with the database connection
const startApp = async (port) => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

startApp(port);
