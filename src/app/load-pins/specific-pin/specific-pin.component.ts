import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { LngLat, Map, Marker, NavigationControl } from 'maplibre-gl';
import { switchMap } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { PinsService } from 'src/app/services/pins.service';
import { recordsType } from 'src/app/shared/location-pins';
import { navigateToLoadPins, zoomSpecificPin } from '../../pin-state/load-pins.actions';
import { getSelectedPinData } from '../../pin-state/load-pins.selectors';

@Component({
  selector: 'app-specific-pin',
  templateUrl: './specific-pin.component.html',
  styleUrls: ['./specific-pin.component.css']
})
export class SpecificPinComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  selectedPinData:recordsType|undefined;
  marker:Marker|undefined;
  error:string=''
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private route:ActivatedRoute,private pinService:PinsService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next:(param)=>{
        this.store.dispatch(zoomSpecificPin({id:param['id']}));
      }
    });

    this.store.select(getSelectedPinData).subscribe({
      next:(record)=>{
        this.selectedPinData=record;
        if(record){
          this.setMarker(record.geocode.Longitude,record.geocode.Latitude)
        }else{
          this.error='No Point found with given Id'
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: ` https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh `
    });

    this.marker?.addTo(this.map);

    if(this.marker){
      this.map.setZoom(18);
      this.map.setCenter(this.marker.getLngLat());
    }

    this.map.addControl(new NavigationControl({}),'top-right');
  }
  ngOnDestroy(): void {
    this.map?.remove()
  }

  setMarker(lng:string,lat:string){
    this.marker = new Marker({color:"#FF000"}).setLngLat(new LngLat(Number(lng),Number(lat)));
  }

  onBack(){
    this.store.dispatch(navigateToLoadPins());
  }

}
