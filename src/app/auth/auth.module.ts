import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/materialModule/material.module';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthModule { }
