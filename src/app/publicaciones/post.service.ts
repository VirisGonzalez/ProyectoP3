import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, ɵɵDirectiveDeclaration } from "@angular/core"
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = []; //primera matriz
  private postsUpdate = new Subject<Post[]>();

  constructor (private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api.posts')
    .pipe(map((postData)=> {
      return postData.posts.map(post => {
        return{
          title: post.title,
          direccion: post.direccion,
          telefono: post.telefono,
          caja: post.caja,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPostsUpdateListener(){
    return this.postsUpdate.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, direccion: string, telefono: string, caja: string, content: string}>
    ("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, direccion: string, telefono: string, caja: string, content: string){
    const post: Post = {id: null, title: title, direccion: direccion, telefono: telefono, caja: caja, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api.posts', post)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, direccion: string, telefono: string, caja: string, content: string){
    const post: Post = {id: id, title: title, direccion: direccion, telefono: telefono, caja: caja, content: content};
    this.http.put("http://localhost:3000/api.posts/" + id, post)
    .subscribe(response =>{
      const updatePost = [...this.posts];
      const oldPosIndex = updatePost.findIndex(p => p.id === post.id);
      updatePost[oldPosIndex] = post;
      this.posts = updatePost;
      this.postsUpdate.next([...this.posts]);
    });
  }

  deletePost(id: string){
    this.http.delete('http://localhost:3000/api.posts/' + id)
    .subscribe(() =>{
      const updatePosts = this.posts.filter(post => post.id !== id);
      this.posts = updatePosts;
      this.postsUpdate.next([...this.posts]);
    });
  }
}
