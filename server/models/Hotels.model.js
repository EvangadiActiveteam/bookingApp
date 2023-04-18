import { Schema, model, SchemaTypes } from "mongoose";

const HotelsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your Hotel Name"],
    minlength: 1,
  },
  location: {
    type: String,
    required: [true, "Please provide your Hotel Location"],
    minlength: 1,
  },
  description: {
    type: String,
  },
  rooms: {
    type: [SchemaTypes.ObjectId],
    ref: "Room",
  },
  images: {
    type: Array,
  },
});

export const Hotel = model("Hotel", HotelsSchema);
