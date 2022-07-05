import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LngLat, LngLatBounds, Map,Marker, NavigationControl, Popup } from 'maplibre-gl';
import { map, take } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { lngLatList, markerList } from 'src/app/models/marker-list.model';
import { deletePin, loadAllPins, makeUpdatePinNull, navigateToUpdatePin, toBeUpdatePinData } from 'src/app/pin-state/load-pins.actions';
import { getDeletedPinId, getPins, getUpdatedPinData, } from 'src/app/pin-state/load-pins.selectors';
import { recordsType } from 'src/app/shared/location-pins';

@Component({
  selector: 'app-update-and-delete-pins',
  templateUrl: './update-and-delete-pins.component.html',
  styleUrls: ['./update-and-delete-pins.component.css']
})
export class UpdateAndDeletePinsComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  markerList:markerList[]=[];
  records:recordsType[]=[];
  lngLats:lngLatList[]=[]
  mapBounds:LngLatBounds=new LngLatBounds()
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getPins).subscribe({
      next:(records)=>{
        if(!this.markerList.length){
          this.records=records
          records.forEach((val)=>{
            this.createMarker(val);
          });
        }
      }
    });
    this.store.dispatch(loadAllPins());

    this.store.select(getUpdatedPinData).subscribe({
      next:(updatedData)=>{
        if(updatedData){
          this.records=this.records.map((val)=>{
            if(val.propertyID==updatedData.propertyID){
                  return updatedData;
            }else{
                  return val;
            }
          });
          console.log(updatedData.propertyID);
          let marker = this.markerList.filter((val)=>{
            return updatedData.propertyID==val.id
          });

          if(marker){
            this.updateMarker(marker[0].marker,updatedData.geocode.Longitude,updatedData.geocode.Latitude,updatedData.favorite,updatedData.propertyID);
          }
          
          this.store.dispatch(makeUpdatePinNull());
        }
      }
    });

    this.store.select(getDeletedPinId).subscribe({
      next:(id)=>{
        if(id){
          this.updateAfterDelete(id);
        }
      }
    })
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

  createMarker(val:recordsType){
    let lngLat = this.getLngLat(val.geocode.Longitude,val.geocode.Latitude);
    let marker = new Marker({color:"#FF000"}).setLngLat(lngLat);
    let markerData:markerList={
      id:val.propertyID,
      marker:marker
    }

    this.setPopup(marker,val.favorite,val.propertyID)
    this.lngLats.push({id:val.propertyID,lngLat:lngLat})
    this.markerList.push(markerData);
    this.mapBounds.extend(lngLat);
  }

  getLngLat(lng:string,lat:string):LngLat{
    return new LngLat(Number(lng),Number(lat))
  }

  setPopup(marker:Marker,favorite:boolean,id:number){
    let div = document.createElement('div');
    div.className='d-flex';

    let img = document.createElement('img');
    img.className='m-2';
    img.style.cursor='pointer';
    if(favorite){
      img.src='assets/heart.png';
    }else{
      img.src='assets/heart_blank.png';
    }

    let updateEl = document.createElement('img');
    updateEl.className='m-2'
    updateEl.style.cursor='pointer';
    updateEl.src='assets/update.png';
    updateEl.addEventListener('click',(e)=>{
      this.onUpdate(id);
    })

    let deleteEl = document.createElement('img');
    deleteEl.src='assets/delete.png';
    deleteEl.style.cursor='pointer';
    deleteEl.className='m-2';
    deleteEl.addEventListener('click',(e)=>{
      this.onDelete(id);
    })

    div.append(img,updateEl,deleteEl)

    marker.setPopup(new Popup({closeButton:false}).setDOMContent(div));
  }

  onUpdate(id:number){
    this.markerList.forEach((val)=>{
      if(val.marker.getPopup().isOpen()){
        val.marker.togglePopup();
      }
    })
    let recordUpdate=this.records.filter((val)=>{
      return val.propertyID==id;
    })
    this.map?.setCenter(new LngLat(Number(recordUpdate[0].geocode.Longitude),Number(recordUpdate[0].geocode.Latitude)));
    this.map?.setZoom(18);
    this.store.dispatch(toBeUpdatePinData({record:recordUpdate[0]}))
    this.store.dispatch(navigateToUpdatePin({pinId:id}));
  }

  updateMarker(marker:Marker,lng:string,lat:string,fav:boolean,id:number){
    marker.setLngLat(new LngLat(Number(lng),Number(lat)));
    this.setPopup(marker,fav,id);
    marker.togglePopup();
    
  }

  onListClick(lng:string,lat:string){
    this.map?.setCenter(new LngLat(Number(lng),Number(lat)));
    this.map?.setZoom(18);
  }

  onDelete(id:number){
    let marker = this.markerList.filter((val)=>{
      return val.id==id;
    });

    if(marker[0]){
      this.store.dispatch(deletePin({id:marker[0].id}))
    }
  }

  updateAfterDelete(id:number){
    let marker = this.markerList.filter((val)=>{
      return val.id==id;
    });

    if(marker[0]){
      marker[0].marker.remove();
      this.records = this.records.filter((val)=>{
        return val.propertyID!=id;
      });
      this.markerList = this.markerList.filter((val)=>{
        return val.id!=id
      });
      this.lngLats = this.lngLats.filter((val)=>{
        return val.id!=id;
      })

      this.updateMapCenter();
    }
  }

  updateMapCenter(){
    this.mapBounds = new LngLatBounds();
    this.lngLats.forEach((val)=>{
      this.mapBounds.extend(val.lngLat);
    })
      this.map?.fitBounds(this.mapBounds,{
        center:this.mapBounds.getCenter(),
        zoom:12
    })
  }

}
