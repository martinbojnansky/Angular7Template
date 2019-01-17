import { Component } from '@angular/core';
import { AuthorizationGuard } from './core/guards/authorization.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(authorizedGuard: AuthorizationGuard) {}

  title = 'angular7-template';
}
