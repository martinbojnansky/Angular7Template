import { Component, OnInit } from '@angular/core';
import { LocaleService } from '@app/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  date: Date = new Date();

  constructor(public localeService: LocaleService) {}

  ngOnInit() {}
}
