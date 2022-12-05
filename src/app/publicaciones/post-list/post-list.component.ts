import {Component, OnInit, OnDestroy} from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "../post.service"
import { FormControl } from "@angular/forms";


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

posts: Post[] =[];
private postsSub: Subscription;
public load: boolean;
public selectControl : FormControl = new FormControl();

  constructor(public postsService: PostService){this.load = false;}
  ngOnInit(){
    setTimeout(() => {
      this.load = true;
    }, 1000);
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: Post[]) =>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(_id: string){
    this.postsService.deletePost(_id)
  }
}
