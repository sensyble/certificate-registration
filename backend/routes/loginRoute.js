// loginRoute.js
import express from 'express';
import { Institute } from '../models/institute.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { universityEmail, password } = req.body;

    // Check if the user or institute exists
    const user = await Institute.findOne({ universityEmail });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Send a success response
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
