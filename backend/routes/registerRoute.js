import express from "express";
import { Institute } from "../models/institute.js";
const router = express.Router();

// Registration route
router.post("/", async (req, res) => {
  try {
    const newInstitute = {
      universityName: req.body.universityName,
      universityEmail: req.body.universityEmail,
      universityAddress: req.body.universityAddress,
      username: req.body.username,
      password: req.body.password
    };

    // Check if a user with the same username or universityEmail already exists
    const existingUser = await Institute.findOne({
      $or: [{ username: newInstitute.username }, { universityEmail: newInstitute.universityEmail }]
    });

    if (existingUser) {
      return res.status(400).send({ message: 'User or institute with the provided details already exists' });
    }

    const institute = await Institute.create(newInstitute);
    return res.status(200).send(institute);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
