import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ModalsModule } from './modals/modals.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentsModule,
    ModalsModule,
    PipesModule
  ]
})
export class SharedModule { }
