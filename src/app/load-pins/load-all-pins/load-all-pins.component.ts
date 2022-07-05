import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { LngLat, LngLatBounds, Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { AppState } from 'src/app/app-state/app.state';
import { markerList } from 'src/app/models/marker-list.model';
import { recordsType } from 'src/app/shared/location-pins';
import { loadAllPins, navigateToSpecificPin } from '../../pin-state/load-pins.actions';
import { getPins } from '../../pin-state/load-pins.selectors';

@Component({
  selector: 'app-load-all-pins',
  templateUrl: './load-all-pins.component.html',
  styleUrls: ['./load-all-pins.component.css']
})
export class LoadAllPinsComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  markerList:markerList[]=[];
  records:recordsType[]=[];
  mapBounds:LngLatBounds=new LngLatBounds()
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getPins).subscribe({
      next:(records)=>{
        this.records=records;
        records.forEach((val)=>{
          this.createMarker(val);
        })
      }
    })
    this.store.dispatch(loadAllPins());
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: ` https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh `
    });

    this.map.addControl(new NavigationControl({}),'top-right');

    this.markerList.forEach((marker)=>{
      if(this.map){
        marker.marker.addTo(this.map);
      }
    });

    this.map.fitBounds(this.mapBounds,{
      center:this.mapBounds.getCenter(),
      zoom:13
    });

  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

  getLngLat(lng:string,lat:string):LngLat{
    return new LngLat(Number(lng),Number(lat))
  }

  onZoomClick(id:number){
    this.store.dispatch(navigateToSpecificPin({pinId:id}))
  }

  createMarker(val:recordsType){
    let lngLat = this.getLngLat(val.geocode.Longitude,val.geocode.Latitude);
    let marker = new Marker({color:"#FF000"}).setLngLat(lngLat);
    marker.getElement().addEventListener('click',(e)=>{
      this.onZoomClick(val.propertyID);
    });
    let markerData:markerList={
      id:val.propertyID,
      marker:marker
    }
    this.markerList.push(markerData);
    this.mapBounds.extend(lngLat);
  }

}