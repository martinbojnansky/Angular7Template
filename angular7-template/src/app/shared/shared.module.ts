import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as components from './components';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, components.ComponentsModule],
  exports: [CommonModule, FormsModule, components.ComponentsModule]
})
export class SharedModule {}
