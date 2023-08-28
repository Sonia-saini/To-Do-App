const express = require("express");
const { Todomodel } = require("../Model/TodoModel");
require("dotenv").config();
const todoRouter = express.Router();
todoRouter.post("/addtodo", async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    let match = await Todomodel.findOne({ title, description, userId });
    if (match) {
      res.status(401).json({ msg: "Do not allowed duplicate todo" });
    } else {
      let todo = new Todomodel({ title, description, userId });
      await todo.save();
      res.status(200).json({ msg: "New Task created" });
    }
  } catch (err) {
    res.send("add to todo have some error");
  }
});
todoRouter.get("/gettodo", async (req, res) => {
  const { userId } = req.body;
  try {
    let alltodo = await Todomodel.find({ userId });
    res.status(200).json({ todo: alltodo });
  } catch (err) {
    res.status(400).json({ msg: "To do get request have some error" });
  }
});
todoRouter.patch("/updatetodo/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    let match = await Todomodel.findOne({ _id: id, userId });
    if (match) {
      let todo = await Todomodel.findByIdAndUpdate(
        { _id: id, userId },
        req.body
      );
      res.status(200).json({ msg: "Task is updated" });
    } else {
      res.status(401).json({ msg: "You are Unauthorize User" });
    }
  } catch (err) {
    res.status(400).json({ msg: "To do update request have some error" });
  }
});
todoRouter.delete("/deletetodo/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    let match = await Todomodel.findOne({ _id: id, userId });
    if (match) {
      let todo = await Todomodel.findByIdAndDelete(
        { _id: id, userId },
        req.body
      );
      res.status(200).json({ msg: "Task is deleted" });
    } else {
      res.status(401).json({ msg: "You are Unauthorize User" });
    }
  } catch (err) {
    res.status(400).json({ msg: "To do delete request have some error" });
  }
});
module.exports = { todoRouter };
