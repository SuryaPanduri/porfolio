const express = require('express');
const Project = require('../models/Project');
const auth = require('../utils/authMiddleware');

const router = express.Router();

// public: list
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// admin: create
router.post('/', auth, async (req, res) => {
  const p = new Project(req.body);
  await p.save();
  res.json(p);
});

// admin: update
router.put('/:id', auth, async (req, res) => {
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// admin: delete
router.delete('/:id', auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;