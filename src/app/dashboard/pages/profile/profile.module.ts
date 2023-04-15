import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ComponentsModule } from './components/components.module';
import { ModalsModule } from './modals/modals.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule,
    ModalsModule
  ]
})
export class ProfileModule { }
