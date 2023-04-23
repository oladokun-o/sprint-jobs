import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { EntryComponent } from './pages/entry/entry.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../utils/modules/material.module';


@NgModule({
  declarations: [
    SiteComponent,
    EntryComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class SiteModule { }
