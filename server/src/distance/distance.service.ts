import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class DistanceService {
    
    constructor() {}

    protected baseAddress: string = "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix";

    protected headersRequest = {
        "content-type":"application/json",
        "x-rapidapi-host":"trueway-matrix.p.rapidapi.com",
        "x-rapidapi-key":"0604765222mshc68469b6f8fb753p1141f5jsnecf812c2571d"
    }

    public async getDistance(originLat: number, originLon: number, destLat: number, destLon: number): Promise<number> {

        // Using Trueway API to calculate driving distance between user and restaurant 
        let coords = {
            "destinations": `${destLat}%2C${destLon}%3B`,
            "origins": `${originLat}%2C${originLon}%3B;`
        }
        try {
            const response = await axios({
                method: 'GET', 
                url: `${this.baseAddress}`, 
                headers: this.headersRequest, params: coords
            });

            return response.data.distances[0];
    
        } catch (err) {
            console.log(err);
        }
    }
}
