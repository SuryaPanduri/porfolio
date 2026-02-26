const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Project");
const auth = require("../utils/authMiddleware");

const router = express.Router();

/**
 * PUBLIC ROUTES
 */

// Get all projects (latest first)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Get featured projects (for Home page)
router.get("/featured", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error("FEATURED PROJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN ROUTES (Protected)
 */

// Create a project
router.post("/", auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: "Failed to create project" });
  }
});

// Update a project
router.put("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: "Failed to update project" });
  }
});

// Delete a project
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete project" });
  }
});

// Get single project by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
});

module.exports = router;
