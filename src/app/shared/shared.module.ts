import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConstantsPipe, LocalizePipe } from '@app/shared/pipes';
// import { PrimengModule } from '@app/shared/components';

@NgModule({
  declarations: [
    // Pipes
    LocalizePipe,
    ConstantsPipe
  ],
  imports: [
    CommonModule,
    // Components
    FormsModule,
    ReactiveFormsModule
    // PrimengModule
  ],
  exports: [
    CommonModule,
    // Components
    FormsModule,
    ReactiveFormsModule,
    // PrimengModule
    // Pipes
    LocalizePipe,
    ConstantsPipe
  ]
})
export class SharedModule {}
