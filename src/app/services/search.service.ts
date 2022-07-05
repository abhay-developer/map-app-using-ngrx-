import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  searchLocation(locationName:string){
    return this.http.get(`https://api.maptiler.com/geocoding/${locationName}.json?key=${environment.MAP_TILER_KEY}`)
  }

}
