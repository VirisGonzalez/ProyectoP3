import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { PortafolioComponent } from './animals/portafolio/portafolio.component';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { NuevoComponent } from './animals/nuevo/nuevo.component'

const routes: Routes = [
  {path: '', component: BodyComponent},
  //{path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
  {path: 'list', component: PostListComponent},
  {path: 'createP', component: NuevoComponent},
  {path: 'editP/:petId', component: NuevoComponent},
  {path: 'all', component: PortafolioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
