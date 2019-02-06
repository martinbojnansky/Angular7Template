import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as pipes from './pipes';

@NgModule({
  declarations: [pipes.LocalizePipe, pipes.ConstantsPipe],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, pipes.LocalizePipe, pipes.ConstantsPipe]
})
export class SharedModule {}
