import mongoose, {Schema} from "mongoose";

const directorSchema = new Schema({name: String, age: Number})

export default mongoose.model("Director", directorSchema);
