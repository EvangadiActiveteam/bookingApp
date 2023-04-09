import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/connect.mjs";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const startApp = async (port) => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {}
};

startApp(port);
