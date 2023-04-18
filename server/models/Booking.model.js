import { Schema, model, SchemaTypes } from "mongoose";

const BookingSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  isCouple: {
    type: Boolean,
    default: false,
  },
  rooms: {
    type: [SchemaTypes.ObjectId],
    ref: "Room",
  },
});

export const Bookings = model("Booking", BookingSchema);
