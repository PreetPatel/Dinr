import { Injectable } from '@nestjs/common';
import { DistanceService } from './distance/distance.service';
import { Restaurant } from './models/restaurant';
import { SearchService } from './search/search.service';
import { SetupService } from './setup/setup.service';
import { Interaction } from './models/interaction';


@Injectable()
export class AppService {
  constructor(
    private distanceService: DistanceService,
    private searchService: SearchService,
    private setupService: SetupService,
    ) {}

  originalLat: number;
  originalLon: number;
  allRestaurants: Restaurant[];


  private interactions = new Map();

  async getRestaurants(lat: number, lon: number,
    cuisines: string, priceRange: number ): Promise<Restaurant[]> {
      this.originalLat = lat;
      this.originalLon = lon;

      // Search given distance modifier  
      this.allRestaurants = await this.searchService.expandingSquaresearch(lat, lon, cuisines, priceRange); 

      // Get distances for each restaurant that we've gotten back
      this.allRestaurants = await this.getDistancesForRestaurants(this.allRestaurants);

      return this.allRestaurants;
  }

  async getDistancesForRestaurants(restaurants: Restaurant[]): Promise<Restaurant[]> {
    for (let restaurant of restaurants){
      restaurant.distance = await this.distanceService.getDistance(this.originalLat, this.originalLon, restaurant.latitude, restaurant.longitude);
    } 
    return restaurants;
  }

  setupInteration(lat: number, lon: number, cuisines: string[], priceRange: number) {
    // Create new interaction
    let interaction: Interaction = this.setupService.createNewInteraction(cuisines, priceRange, lat, lon);
    this.interactions.set(interaction.id, interaction);
    return interaction;
  }

  getInteraction(id: string) {

    if (!this.interactions.has(id)) {
      return ['Error: Session Code not found'];
    }
    return this.interactions.get(id);
  }

}
