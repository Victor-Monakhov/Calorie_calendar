import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public socialUser?: SocialUser;
  public isLoggedIn: boolean = false;

  constructor(private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: any) => {
      this.socialUser = user;
      this.isLoggedIn = (user != null);
      if(this.isLoggedIn){
        localStorage.setItem('token', JSON.stringify(this.socialUser?.authToken));
        this.router.navigate(['/calendar']);
      }
    });
  }

  public onAuth(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
