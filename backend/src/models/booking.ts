import { Schema, model, Document } from 'mongoose';
import { IFlight } from './flight';
import { ISeat } from './seat';

interface IPassenger extends Document {
    name: string;
    age: number;
    sex: string;
    seat: {
        seatType: string,
        seatNumber: string,
        seatID: ISeat
    };
}

interface IBooking extends Document {
    pnr: string;
    ticketNumber: string;
    passengerInfo: IPassenger[];
    flightDetails: IFlight;
    bookingDate: Date;
    bookingStatus: 'confirmed' | 'pending' | 'cancelled';
    paymentInfo: {
        method: string;
        status: 'paid' | 'pending' | 'refunded';
        amount: number;
    };
    contactInfo: {
        email: string;
        phone: string;
    };
    specialRequests?: string;
    frequentFlyerNumber?: string;
    baggageDetails?: {
        numberOfBags: number;
        weight: number;
    };
    travelDocumentInfo?: {
        passportNumber?: string;
        visaInfo?: string;
    };
    emergencyContactInfo?: {
        name: string;
        phone: string;
        relation: string;
    };
    additionalServices?: string[];
    insuranceDetails?: string;
    notes?: string;
}

const bookingSchema = new Schema<IBooking>({
    pnr: { type: String, required: true, unique: true },
    ticketNumber: { type: String, required: true, unique: true },
    passengerInfo: [{
        name: { type: String, required: true },
        age: { type: Number, required: true },
        sex: { type: String, required: true },
        seat: {
            seatType: { type: String, required: true },
            seatNumber: { type: String, required: true, unique: true },
            seatID: { type: Schema.Types.ObjectId, ref: 'Seat' }
        }
    }],
    flightDetails: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
    bookingDate: { type: Date, required: true },
    bookingStatus: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'confirmed' },
    paymentInfo: {
        method: { type: String, required: true },
        status: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'pending' },
        amount: { type: Number, required: true }
    },
    contactInfo: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    specialRequests: { type: String },
    frequentFlyerNumber: { type: String },
    baggageDetails: {
        numberOfBags: { type: Number },
        weight: { type: Number }
    },
    travelDocumentInfo: {
        passportNumber: { type: String },
        visaInfo: { type: String }
    },
    emergencyContactInfo: {
        name: { type: String },
        phone: { type: String },
        relation: { type: String }
    },
    additionalServices: [{ type: String }],
    insuranceDetails: { type: String },
    notes: { type: String }
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
export type { IBooking, IPassenger };
