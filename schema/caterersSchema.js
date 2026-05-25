import mongoose from "mongoose";

const catererSchema = new mongoose.Schema({
  // id: String,
  name: String,
  location: String,
  pricePerPlate: Number,
  cuisines: [String],
  rating: Number,
});
export default mongoose.model("caterer", catererSchema);
