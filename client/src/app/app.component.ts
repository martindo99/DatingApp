import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgxSpinnerComponent, NavComponent, RouterOutlet]
})

export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentuser(user);
  }
}  
