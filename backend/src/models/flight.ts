import { Schema, model, Document } from 'mongoose';
import { seatSchema, ISeat } from './seat';

interface IFlight extends Document {
    flightNumber: String;
    source: { fullname: String, code: String };
    destination: { fullname: String, code: String };
    departure: Date;
    arrival: Date;
    status: 'on time' | 'delayed' | 'canceled';
    price: Number;
    seats: ISeat[];
}

const filghtSchema = new Schema({
    flightNumber: { type: String, required: true, unique: true },
    source: { fullname: String, code: String },
    destination: {
        fullname: String,
        code: String
    },
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },
    status: { type: String, enum: ['on time', 'delayed', 'canceled'], default: 'on time' },
    price: { type: Number, required: true },
    seats: [seatSchema]
})
const Flight = model('Flight', filghtSchema);

export default Flight;
export type { IFlight };