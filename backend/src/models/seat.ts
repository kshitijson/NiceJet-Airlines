import { Schema, model, Document } from 'mongoose';

interface ISeat extends Document {
    type: 'window' | 'middle' | 'aisle' | 'deluxe';
    price: number;
    available: number;
    booked: number;
    _id: string;
}

export const seatSchema = new Schema<ISeat>({
    type: { type: String, enum: ['window', 'middle', 'aisle', 'deluxe'], required: true },
    price: { type: Number, required: true },
    available: { type: Number, required: true },
    booked: { type: Number, default: 0 }
});
export const Seat = model<ISeat>('Seat', seatSchema)

export type { ISeat };