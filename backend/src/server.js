import express from "express";
import dotenv from "dotenv";
import path from "path";
import url from "url";

dotenv.config();

const app = express();

app.use(express.static(path.join(path.resolve(), "../../frontend/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../../frontend/dist/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
