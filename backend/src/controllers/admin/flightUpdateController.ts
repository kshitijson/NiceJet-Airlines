import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { serverErrMsg } from '../../utils/serverErr';
import { UpdateRecord } from '../../interfaces/updateRecord';


// recursive function to build mongodb $set object for nested objects
const buildUpdateObject = (prefix: string, obj: any, updateObj: any) => {

    // loop through the object
    for (const key in obj) {

        // check if obj[key] is an object ==> object can be { }, null or an array
        // check check that obj[key] is an object and also obj[key] id not null or is not an array
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {

            // send recurive call for its child objects with prefix as prefix+key+'.' -> '.' is for appending next child
            buildUpdateObject(`${prefix}${key}.`, obj[key], updateObj);
        } else {
            // else there are no more nested object so the prefix accumulated until now + key
            // as the new key and its value will be obj[key] / value of the current nested object key
            updateObj[`${prefix}${key}`] = obj[key];
        }
    }
};

export const FlightUpdate = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const { flightID, flightUpdateDetails }: { flightID: string, flightUpdateDetails: Partial<IFlight> } = req.body;

        const updateFields: any = {};
        buildUpdateObject('', flightUpdateDetails, updateFields);

        const updateResult = await Flight.updateOne(
            { _id: flightID },
            {
                $set: updateFields
            },
            { upsert: false }
        ) as UpdateRecord;

        if (updateResult.modifiedCount === 1) 
            return res.status(200).send({
                state: true,
                message: "Flight updated Successfully"
            });

        return res.status(404).send({
                state: true,
                message: "Unable to Update Flight Details, Please try again"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(serverErrMsg);
    }

}