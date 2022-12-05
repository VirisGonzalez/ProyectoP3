import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";
import { Pet } from "../pet.model";
import { PetService } from "../pet.service";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-portafolio',
    templateUrl: './portafolio.component.html',
    styleUrls: ['./portafolio.component.css'],
})

export class PortafolioComponent implements OnInit, OnDestroy{

pets: Pet[] =[];
isLoading = false;
private petsSub: Subscription;
public load: boolean;
public selectControl : FormControl = new FormControl();

  constructor(public petsService: PetService){this.load = false;}
  ngOnInit(){
    setTimeout(() => {
      this.load = true;
    }, 1000);
    this.isLoading = true;
    this.petsService.getPets();
    this.petsSub = this.petsService.getPetsUpdateListener()
    .subscribe((pets: Pet[]) =>{
      this.isLoading = false;
      this.pets = pets;
    });
  }

  ngOnDestroy(){
    this.petsSub.unsubscribe();
  }

  onDelete(_id: string){
    this.petsService.deletePet(_id)
  }
}

