import { Schema, model, Document } from 'mongoose';
import { seatSchema, ISeat } from './seat';
import { IAdmin } from './admin';

interface IFlight extends Document {
    flightNumber: String;
    source: { fullname: String, code: String };
    destination: { fullname: String, code: String };
    departure: Date;
    arrival: Date;
    status: 'on time' | 'delayed' | 'canceled';
    price: Number;
    seats: {
        [key: string]: ISeat;
    }; 
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
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },
    status: { type: String, enum: ['on time', 'delayed', 'canceled'], default: 'on time' },
    price: { type: Number, required: true },
    seats: {
        type: Map,
        of: seatSchema,
        required: true
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' }
});
const Flight = model<IFlight>('Flight', flightSchema);

export default Flight;
export type { IFlight };