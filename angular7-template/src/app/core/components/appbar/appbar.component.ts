import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '@app/core/services';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit() {}

  signInOrOut() {
    if (this.authorizationService.isAuthorized()) {
      this.authorizationService.signOut();
    } else {
      this.authorizationService.signIn();
    }
  }
}
