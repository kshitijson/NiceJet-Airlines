import { Schema, model, Document } from 'mongoose';
import { IAdmin } from './admin';
import { ISeat } from './seat';

interface IFlight extends Document {
    flightNumber: String;
    source: { fullname: String, code: String };
    destination: { fullname: String, code: String };
    departure: { date: string, time: string };
    arrival: { date: string, time: string };
    status: 'on time' | 'delayed' | 'canceled';
    price: Number;
    // seats: Record<string, ISeat>; 
    seats: Map<string, ISeat>; 
    createdBy: IAdmin;
    _id: string;
}

const flightSchema = new Schema<IFlight>({
    flightNumber: { type: String, required: true, unique: true },
    source: { 
        fullname: { type: String, required: true }, 
        code: { type: String, required: true } 
    },
    destination: {
        fullname: { type: String, required: true },
        code: { type: String, required: true }
    },
    departure: {
        date: { type: String, required: true },
        time: { type: String, required: true }
    },
    arrival: {
        date: { type: String, required: true },
        time: { type: String, required: true }
    },
    status: { type: String, enum: ['on time', 'delayed', 'canceled'], default: 'on time' },
    price: { type: Number, required: true },
    seats: {
        type: Map,
        of: { type: Schema.Types.ObjectId, ref: 'Seat' },
        required: true
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });
const Flight = model<IFlight>('Flight', flightSchema);

export default Flight;
export type { IFlight };