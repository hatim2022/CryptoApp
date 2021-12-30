import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Agent } from 'src/app/api/agent';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoaded = false;
  user$: Promise<User>;
  user: User;

  @ViewChild('f', { static: false }) signupForm: NgForm;

  constructor(private router: Router, private service: Agent) { }

  ngOnInit(): void {
  }

  getUser(username: string, password: string) {
    this.user$ = this.service.getUser(username, password);
  }

  login() {
    let userInputUsername = this.signupForm.value.userData.username;
    let userInputPassword = this.signupForm.value.userData.password;

    this.getUser(userInputUsername, userInputPassword);

    this.user$.then(user => {
      this.isLoaded = false;
      this.user = user;
      if (this.user) {
        this.router.navigate(['portfolio']);
      } else {
        alert('Incorrect User/Password');
        this.signupForm.reset();
      }
      this.isLoaded = true;
    });

  }

  toNewUser() {
    this.router.navigate(['newuser']);
  }

}
