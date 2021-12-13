require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDb = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT;
connectDb();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hi this si working");
  });
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
