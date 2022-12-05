import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Pet } from "../pet.model";
import { PetService } from "../pet.service";
import { mimeType } from "./mime-type.validator";


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
})
export class NuevoComponent  implements OnInit{

    enteredTitle= '';
    enteredContent= '';
    form: FormGroup;
    imagePreview: string;
    private mode = 'createP';
    private petId: string;
    pet: Pet;
    isLoading = false;
    public load: boolean;
    public seleccionado = "F";
    public selectControl : FormControl = new FormControl();

    test(){
      this.seleccionado = this.selectControl.value;

      console.log(this.seleccionado);
  }

constructor(public petsService: PetService, public route: ActivatedRoute){this.load = false;}

    ngOnInit(){
      this.form = new FormGroup({
        nombre: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        edad: new FormControl(null, {
          validators: [Validators.required],
        }),
        peso: new FormControl(null, {
          validators: [Validators.required],
        }),
        caja: new FormControl(null, {
          validators: [Validators.required],
        }),
        content: new FormControl(null, {
          validators: [Validators.required],
        }),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType],
        }),
      });
      setTimeout(() => {
        this.load = true;
      }, 1000);

      this.route.paramMap.subscribe((paramMap: ParamMap)=> {
        if(paramMap.has('petId')){
          this.mode = 'editP';
          this.petId = paramMap.get('petId');
          this.isLoading = true;
          this.petsService.getPet (this.petId).subscribe((petData) =>{
            this.isLoading = false;
            this.pet = {
              id: petData._id,
              nombre: petData.nombre,
              edad: petData.edad,
              peso: petData.edad,
              caja: petData.caja,
              content: petData.content,
              imagePath: petData.imagePath
          };

          this.imagePreview = petData.imagePath;
          this.form.setValue({
            nombre: this.pet.nombre,
            edad: this.pet.edad,
            peso: this.pet.peso,
            caja: this.pet.caja,
            content: this.pet.content,
            image: this.imagePreview
          });
          console.log(this.imagePreview);

        });
      } else{
          this.mode = 'createP';
          this.petId = null;
        }
      });
    }

    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log(file);

    }


      onSavePet(){
      this.isLoading = true;
        if(this.mode == "createP"){
          this.petsService.addPet(
            this.form.value.nombre,
            this.form.value.edad,
            this.form.value.peso,
            this.seleccionado,
            this.form.value.content,
            this.form.value.image);
        }else{
          this.petsService.updatePet(
            this.petId,
            this.form.value.nombre,
            this.form.value.edad,
            this.form.value.peso,
            this.seleccionado,
            this.form.value.content,
            this.form.value.image
          );

        }
        this.form.reset();
      }
    }

