import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const appRoutes: Routes = [
  {
    path: 'create',
    component: CreatePageComponent,
    data: { title: 'Create' }
  },
  {
    path: 'about',
    component: AboutPageComponent,
    data: { title: 'About' }
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    data: { title: 'Admin Portal' }
  },
  {
    path: '',
    redirectTo: '/create',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CreatePageComponent,
    AboutPageComponent,
    AdminPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
