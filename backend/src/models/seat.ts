import { Schema, model, Document } from 'mongoose';

interface ISeat extends Document {
    price: number;
    available: number;
    booked: number;
}

export const seatSchema = new Schema<ISeat>({
    price: { type: Number, required: true },
    available: { type: Number, required: true },
    booked: { type: Number, default: 0 }
});
export const Seat = model<ISeat>('Seat', seatSchema)

export type { ISeat };