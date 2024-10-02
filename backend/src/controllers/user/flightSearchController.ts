import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { ISeat } from '../../models/seat';

export const FlightSearch = async (req: Request, res: Response): Promise<Response> => {
    const { source, destination, date, people }: { 
        source: Partial<IFlight>, 
        destination: Partial<IFlight>, 
        date: string, 
        people: number 
    } = req.body;

    try {
        // Fetch flights and populate seats
        let flightDetails: IFlight[] = await Flight.find({ 
                source: source,
                destination: destination,
                'departure.date': date,
            }).populate('seats');

        if (flightDetails.length === 0) 
            return res.status(404).send({
                state: false,
                message: "Flights for the specific details do not exist"
            });

        // Filter flights based on available seats
        flightDetails = flightDetails.filter(flight => {
            let totalAvailableSeats = 0;

            // Iterate over seat types in the Map (flight.seats is a Map)
            flight.seats.forEach((seat: ISeat, key: string) => {
                if (seat && seat.available) { // Check for available seats
                    totalAvailableSeats += seat.available;
                }
            });

            // Check if total available seats is enough for the number of people
            return totalAvailableSeats >= people;
        });

        if (flightDetails.length === 0) {
            return res.status(404).send({
                state: false,
                message: "No flights with enough available seats for the specified number of people"
            });
        }

        // Adjust price for the number of people
        flightDetails.forEach(flight => {
            flight.price = (flight.price as number) * people;
        });

        return res.status(200).send({
            state: true,
            message: "Successfully fetched Flight Details",
            flightDetails
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        });
    }
};

