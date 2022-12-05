import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { PostService } from './publicaciones/post.service';
import { PortafolioComponent } from './animals/portafolio/portafolio.component';
import { NuevoComponent } from './animals/nuevo/nuevo.component'
import { PetService } from './animals/pet.service';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    BodyComponent,
    FooterComponent,
    PortafolioComponent,
    NuevoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule

  ],
  providers: [PostService, PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
