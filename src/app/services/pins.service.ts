import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOCATION_PINS, recordsType } from '../shared/location-pins';

@Injectable({
  providedIn: 'root'
})
export class PinsService {

  constructor() { }

  getAllPins():Observable<recordsType[]>{
    return of(LOCATION_PINS.records)
  }

  getSpecifcPinData(id:number|undefined):Observable<recordsType|undefined>{
    return of(LOCATION_PINS.records.find(val=>{
      return val.propertyID==id
    }))
  }

  updateRecord(id:number|undefined,lng:string,lat:string,fav:boolean):Observable<recordsType|undefined>{
    let record:recordsType|undefined=undefined;
    this.getSpecifcPinData(id).subscribe({
      next:(val)=>{
        if(val){
          record = {
            ...val,
            favorite:fav,
            geocode:{
              Latitude:lat,
              Longitude:lng,
              Percision:val.geocode.Percision,
              IsValid:val.geocode.IsValid
            }
          }
        }
      }
    });

    return of(record);
  }
}
