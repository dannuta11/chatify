import express from "express";
import dotenv from "dotenv";
import path from "path";

import { expressApp } from "./config";
import { PORT } from "./constants";

dotenv.config();

expressApp.use(express.static(path.join(__dirname, "../frontend", "dist")));

expressApp.get("/", (_, res) => {
  res.json({ message: "Welcome to Chatify API" });
});

expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
