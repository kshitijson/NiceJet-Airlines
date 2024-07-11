const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});
const User = model('User', UserSchema);


const seatSchema = new Schema({
    type: { type: String, enum: ['window', 'middle', 'aisle', 'deluxe'], required: true },
    price: { type: Number, required: true },
    available: { type: Number, required: true },
    booked: { type: Number, default: 0 }
});
const Seat = model('Seat', seatSchema)

const filghtSchema = new Schema({
    flightNumber: { type: String, required: true, unique: true },
    name: String,
    source: String,
    destination: String,
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },
    status: { type: String, enum: ['on time', 'delayed', 'canceled'], default: 'on time' },,
    price: { type: Number, required: true }
})
const Flight = model('Flight', filghtSchema);



module.exports  = {
    User,
    Flight,
    Seat
}
