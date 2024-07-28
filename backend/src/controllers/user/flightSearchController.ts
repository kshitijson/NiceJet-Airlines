import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';

export const FlightSearch = async (req: Request, res: Response): Promise<Response> => {

    const { 
        source, 
        destination, 
        date, 
        people 
    }: { 
            source: Partial<IFlight>, 
            destination: Partial<IFlight>, 
            date: string, people: number 
        } = req.body;
        

    try {
        
        let flightDetails: IFlight[] = await Flight.find({ 
                source: source,
                destination: destination,
                'departure.date': date,
            });

        if (flightDetails.length == 0) 
            return res.status(404).send({
                state: false,
                message: "Flights for the specific details does not exists"
            })

        flightDetails.forEach(flight => {
            flight.price = (flight.price as number) * people;
        });

        return res.status(200).send({
            state: true,
            message: "Successfully fetched Flight Details",
            flightDetails
        })

    } catch (error) {
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        })
    }


}