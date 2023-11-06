import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    watched: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
