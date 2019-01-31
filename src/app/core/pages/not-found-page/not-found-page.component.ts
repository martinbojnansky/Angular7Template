import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '@app/core/services';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  constructor(public localizationService: LocalizationService) {}

  ngOnInit() {}
}
