import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found-view',
  templateUrl: './not-found-view.component.html',
  styleUrls: ['./not-found-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
