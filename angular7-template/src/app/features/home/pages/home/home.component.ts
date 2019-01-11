import { Component, OnInit } from '@angular/core';
import { HomeRepositoryService } from '../../services/home-repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public users: [];

  constructor(private homeRepositoryService: HomeRepositoryService) {}

  ngOnInit() {
    this.initUsers();
  }

  private initUsers() {
    this.homeRepositoryService.getUsers().subscribe(result => {
      this.users = (<any>result).data;
    });
  }
}
