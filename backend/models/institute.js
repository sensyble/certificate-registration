import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
    universityName: {
      type: String,
      required: true,
    },
    universityEmail: {
      type: String,
      required: true,
    },
    universityAddress: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  export const Institute = mongoose.model('Institute', instituteSchema);



    