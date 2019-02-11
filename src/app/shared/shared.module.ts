import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as pipes from './pipes';

@NgModule({
  declarations: [pipes.LocalizePipe, pipes.ConstantsPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    pipes.LocalizePipe,
    pipes.ConstantsPipe
  ]
})
export class SharedModule {}
