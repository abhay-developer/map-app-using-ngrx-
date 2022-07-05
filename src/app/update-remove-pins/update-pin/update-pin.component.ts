import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { updatePin } from 'src/app/pin-state/load-pins.actions';
import { getToBeUpdatedData } from 'src/app/pin-state/load-pins.selectors';
import { PinsService } from 'src/app/services/pins.service';
import { recordsType } from 'src/app/shared/location-pins';

@Component({
  selector: 'app-update-pin',
  templateUrl: './update-pin.component.html',
  styleUrls: ['./update-pin.component.css']
})
export class UpdatePinComponent implements OnInit {

  updateForm!:FormGroup;
  updatePinData:recordsType|undefined;
  error:string='';

  constructor(private store:Store<AppState>, private pinsService:PinsService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.store.select(getToBeUpdatedData).subscribe({
      next:(record)=>{
        if(record){
          if(record){
            this.updatePinData=record
            this.createUpdateForm();
          }else{
            this.error='No Pin found for given id';
          }
        }
      }
    })
  }

  onUpdateForm(){
    this.store.dispatch(updatePin({
      lng: this.updateForm.value.longititude,
      lat: this.updateForm.value.latitude,
      pinId: this.updatePinData?.propertyID,
      fav: this.updateForm.value.fav
    }));
  }

  createUpdateForm(){
    this.updateForm = new FormGroup({
      longititude:new FormControl(this.updatePinData?.geocode.Longitude,[Validators.required]),
      latitude:new FormControl(this.updatePinData?.geocode.Latitude,[Validators.required]),
      fav:new FormControl(this.updatePinData?.favorite,[Validators.required])
    })
  }

}
