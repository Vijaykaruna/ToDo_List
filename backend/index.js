const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./src/Users");
const ToDoModel = require("./src/ToDos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS for local + production
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app"   // ← add after deployment
    ],
    credentials: true,
  })
);

// DB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json("Success");
  } catch (e) {
    res.status(400).json(e);
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json("Email not found");

  const passOk = bcrypt.compareSync(password, user.password);
  if (!passOk) return res.status(400).json("Incorrect Password");

  jwt.sign({ id: user._id, email }, secret, {}, (err, token) => {
    if (err) throw err;
    res.cookie("token", token, { httpOnly: true }).json("Success");
  });
});

// Profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(403).json("Invalid token");
    res.json(info);
  });
});

// Logout
app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).json("Logged out");
});

// Upload Todo
app.post("/upload", async (req, res) => {
  const { title, data, id } = req.body;

  try {
    await ToDoModel.create({
      title,
      content: data,
      id,
      state: false,
    });

    res.status(200).json("Success");
  } catch (e) {
    res.status(400).json(e);
  }
});

// Get Ongoing Todos
app.get("/ongoing", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(403).json("Invalid token");

    const todos = await ToDoModel.find({ id: info.id, state: false });
    res.json(todos);
  });
});

// Get Completed Todos
app.get("/completed", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(403).json("Invalid token");

    const todos = await ToDoModel.find({ id: info.id, state: true });
    res.json(todos);
  });
});

// Delete Todo
app.delete("/deleteTodo", async (req, res) => {
  const { id } = req.body;

  try {
    const response = await ToDoModel.deleteOne({ _id: id });
    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Mark As Completed
app.put("/finishTodo", async (req, res) => {
  const { id } = req.body;

  try {
    await ToDoModel.updateOne(
      { _id: id },
      {
        $set: {
          state: true,
          time: new Date().toLocaleString(),
        },
      }
    );
    res.json("Updated successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
