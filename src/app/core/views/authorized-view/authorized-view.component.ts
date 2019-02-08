import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { LocalizationService, AuthService } from './../../services';

@Component({
  selector: 'app-authorized-view',
  templateUrl: './authorized-view.component.html',
  styleUrls: ['./authorized-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizedViewComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {}
}
