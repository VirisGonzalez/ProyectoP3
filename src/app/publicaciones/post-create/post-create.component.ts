import { formatCurrency } from "@angular/common";
import {Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { FormControl } from "@angular/forms";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],

})

export class PostCreateComponent implements OnInit{

  enteredTitle= '';
  enteredContent= '';
  private mode = 'create';
  private postId: string;
  post: Post;
  public load: boolean;
  public seleccionado = "Canino";
  public selectControl : FormControl = new FormControl();

  test(){
    this.seleccionado = this.selectControl.value;

    console.log(this.seleccionado);
}

  constructor(public postsService: PostService, public route: ActivatedRoute){this.load = false;}

  ngOnInit(){
    setTimeout(() => {
      this.load = true;
    }, 1000);
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost (this.postId).subscribe(postData =>{
          this.post = {id: postData._id, title: postData.title, direccion: postData.direccion, telefono: postData.telefono, caja: postData.caja, content: postData.content}
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

    onSavePost(form: NgForm){
      if(form.invalid){
        return;
      }
      if(this.mode == "create"){
        this.postsService.addPost(
          form.value.title,
          form.value.direccion,
          form.value.telefono,
          this.seleccionado,
          form.value.content);
      }else{
        this.postsService.updatePost(
          this.postId,
          form.value.title,
          form.value.direccion,
          form.value.telefono,
          this.seleccionado,
          form.value.content
        );
      }
      form.resetForm();
    }
}

