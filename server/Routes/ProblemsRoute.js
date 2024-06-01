const express = require('express');
const router = express.Router();
const Problem = require('../Models/Problems'); // Adjust the path if necessary

// Create a new problem
router.post('/Users', async (req, res) => {
  const { problem, Description } = req.body;
  try {
    const newProblem = new Problem({ problem, Description });
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all problems
router.get('/Users', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a problem
router.delete('/Users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Problem.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
