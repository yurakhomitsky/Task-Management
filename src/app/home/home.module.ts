import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule { }
