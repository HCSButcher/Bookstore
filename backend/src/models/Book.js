import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
