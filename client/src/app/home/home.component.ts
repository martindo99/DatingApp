import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [NgIf, RegisterComponent]
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: any;

  constructor() { }

  ngOnInit(): void {

  }

  toggleMode() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
