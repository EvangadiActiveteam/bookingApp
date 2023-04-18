import { Schema, model, SchemaTypes } from "mongoose";

const RoomSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide your Rooms title"],
    minlength: 1,
  },
  images: {
    type: Array,
    required: [true, "Please provide your Room images"],
  },
  price: {
    type: Number,
    required: [true, "Please provide your Room Price"],
    minlength: 1,
  },
  description: {
    type: String,
  },
  hotel: {
    type: SchemaTypes.ObjectId,
    ref: "Hotels",
  },
});

export const Room = model("Rooms", RoomSchema);
