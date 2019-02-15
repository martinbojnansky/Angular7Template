import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConstantsPipe, LocalizePipe } from '@app/shared/pipes';

@NgModule({
  declarations: [
    // Pipes
    LocalizePipe,
    ConstantsPipe
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Pipes
    LocalizePipe,
    ConstantsPipe
  ]
})
export class SharedModule {}
