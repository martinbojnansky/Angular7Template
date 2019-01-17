import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from './../../services';

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss']
})
export class AuthorizedLayoutComponent implements OnInit {
  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit() {}

  signOut() {
    this.authorizationService.signOut();
  }
}
