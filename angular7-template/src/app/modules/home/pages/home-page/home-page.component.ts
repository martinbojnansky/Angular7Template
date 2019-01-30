import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '@app/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  date: Date = new Date();

  constructor(public localizationService: LocalizationService) {}

  ngOnInit() {}
}
