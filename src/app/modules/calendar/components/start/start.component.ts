import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthService} from "../../../../shared/services/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.init().pipe(
      takeUntil(this.destroy$)
    ).subscribe(user =>{
      if(user){
        this.router.navigate(['/calendar']);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAuth(): void{
    this.authService.signIn();
  }
}
