import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LngLat, LngLatBounds, Map, Marker, NavigationControl } from 'maplibre-gl';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit, AfterViewInit,OnDestroy {

  searchForm!:FormGroup;
  map: Map | undefined;
  markerList:Marker[]=[];
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private searchService:SearchService) { }
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      locationName : new FormControl(null,[Validators.required, Validators.minLength(3)])
    })
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: ` https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh `
    });

    this.map.addControl(new NavigationControl({}),'top-right');
    this.map.setZoom(1);
    this.map.setCenter(new LngLat(34.5085,8.7832))
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  onLocationSearch(){
    if(this.searchForm.invalid){
      return;
    }
    this.searchService.searchLocation(this.searchForm.value.locationName).subscribe({
      next:(resp:any)=>{
        this.markerList.forEach((marker)=>{
          marker.remove();
        })
        if(resp.features){

          let mapBounds = new LngLatBounds();

          resp.features.forEach((val:any)=>{
            let lngLat = new LngLat(Number(val.geometry.coordinates[0]),Number(val.geometry.coordinates[1]));
            let marker = new Marker({color:"#FF000"})
            marker.setLngLat(lngLat);
            if(this.map!=undefined){
              marker.addTo(this.map);
            }
            this.markerList.push(marker);

            mapBounds.extend(lngLat)
          })
          this.map?.fitBounds(mapBounds,{
            center:mapBounds.getCenter(),
            zoom:1
          })
        }
      }
    })
  }

}
