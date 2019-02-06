import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { LocalizationService, AuthService } from './../../services';

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizedLayoutComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {}
}
