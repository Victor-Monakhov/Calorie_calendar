import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {Observable, of, switchMap} from "rxjs";
import {StorageService} from "./storage.service";
import {StorageKeys} from "../enums/storage-keys";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(private socialAuthService: SocialAuthService, private storageService: StorageService) {
  }

  public init(){
    return this.socialAuthService.authState.pipe(
      switchMap(user => {
        if(user){
          this.isLoggedIn = true;
          this.storageService.setItem(StorageKeys.token, user.authToken);
        }
        return of(user)
      }));
  }

  public signIn(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOut(callback: Function){
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).
    then(() => this.socialAuthService.signOut()).
    then(() => {
      localStorage.removeItem(StorageKeys.token);
      callback();
    });
  }
}
