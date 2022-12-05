import { Pet } from "./pet.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Form } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class PetService{
  private pets: Pet[] = [];
  private petsUpdate = new Subject<Pet[]>();

  constructor (private http: HttpClient, private router: Router){}

  getPets(){
    this.http.get<{message: string, pets: any}>('http://localhost:3000/api.pets/all')
    .pipe(map((petData)=> {
      return petData.pets.map(pet => {
        return{
          nombre: pet.nombre,
          edad: pet.edad,
          peso: pet.peso,
          caja: pet.caja,
          content: pet.content,
          id: pet._id,
          imagePath: pet.imagePath
        };
      });
    }))
    .subscribe((transformedPets)=>{
      this.pets = transformedPets;
      this.petsUpdate.next([...this.pets]);
    });
  }

  getPetsUpdateListener(){
    return this.petsUpdate.asObservable();
  }

  getPet(id: string){
    return this.http.get<{_id: string, nombre: string, edad: string, peso: string, caja: string, content: string, imagePath: string}>
    ("http://localhost:3000/api.pets/" + id);
  }

  addPet(nombre: string, edad: string, peso: string, caja: string, content: string, image: File){
    const petData = new FormData();
    petData.append("nombre",nombre);
    petData.append("edad",edad);
    petData.append("peso", peso);
    petData.append("caja", caja);
    petData.append("content", content);
    petData.append("image", image);
    //const pet: Pet = {id: null, nombre: nombre, edad: edad, peso: peso, caja: caja, content: content,};
    this.http.post<{message: string, pet: Pet}>('http://localhost:3000/api.pets', petData)
    .subscribe((responseData)=>{
      const pet: Pet = {
        id: responseData.pet.id,
        nombre: nombre,
        edad: edad,
        peso: peso,
        caja: caja,
        content: content,
        imagePath: responseData.pet.imagePath
      };
      this.pets.push(pet);
      this.petsUpdate.next([...this.pets]);
      this.router.navigate(["/createP"]);
    });
  }

  updatePet(id: string, nombre: string, edad: string, peso: string, caja: string, content: string, image: File | string){
    let petData: Pet | FormData;
    if(typeof image === "object"){
      petData = new FormData();
      petData.append("id",id);
      petData.append("nombre", nombre);
      petData.append("edad",edad);
      petData.append("peso", peso);
      petData.append("caja",caja);
      petData.append("content",content);
      petData.append("image",image, nombre);
    }
    else{
      const petData ={
        id:id,
        nombre:nombre,
        edad:edad,
        peso:peso,
        caja:caja,
        content:content,
        imagePath: image
      }
    }
    //const pet: Pet = {id: id, nombre: nombre, edad: edad, peso: peso, caja: caja, content: content};
    this.http.put("http://localhost:3000/api.pets/" + id, petData)
    .subscribe(response =>{
      const updatePet = [...this.pets];
      const oldPosIndex = updatePet.findIndex(p => p.id === id);
      const pet: Pet ={
        id:id,
        nombre:nombre,
        edad:edad,
        peso:peso,
        caja:caja,
        content:content,
        imagePath: ""
      }
      updatePet[oldPosIndex] = pet;
      this.pets = updatePet;
      this.petsUpdate.next([...this.pets]);
      this.router.navigate(["/all"]);
    });
  }

  deletePet(id: string){
    this.http.delete('http://localhost:3000/api.pets/' + id)
    .subscribe(() =>{
      const updatePet = this.pets.filter(pet => pet.id !== id);
      this.pets = updatePet;
      this.petsUpdate.next([...this.pets]);
    })
  }
}
