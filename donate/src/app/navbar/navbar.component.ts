import { take, map } from 'rxjs/operators';
import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    return this.auth.user$
      .pipe(
        map((user) => !!user) // <-- map to boolean
      )
      .subscribe((loggedIn: boolean) => {
        console.log('user logged in?', this.isUserLoggedIn);
        this.isUserLoggedIn = loggedIn;
      });
  }
}
