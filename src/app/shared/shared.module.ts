import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormErrorMessageComponent } from './components/form-error-message/form-error-message.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MaterialModule } from './materialModule/material.module';


@NgModule({
  declarations: [HeaderComponent,FooterComponent, FormErrorMessageComponent, LoaderComponent, MessagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    FormErrorMessageComponent,
    LoaderComponent,
    MessagesComponent
  ]
})
export class SharedModule { }
