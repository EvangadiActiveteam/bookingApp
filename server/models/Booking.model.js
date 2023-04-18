import { Schema, model, SchemaTypes } from "mongoose";

const BookingSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "Users",
  },
  isCouple: {
    type: Boolean,
    default: false,
  },
  rooms: {
    type: [SchemaTypes.ObjectId],
    ref: "Rooms",
  },
});

export const Bookings = model("Bookings", BookingSchema);
