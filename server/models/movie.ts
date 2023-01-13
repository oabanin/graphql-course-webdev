import mongoose, {Schema} from "mongoose";

const movieSchema = new Schema({name: String, genre: String, directorId: String})

export default mongoose.model("Movie", movieSchema);
