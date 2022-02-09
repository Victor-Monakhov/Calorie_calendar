import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {combineLatest, map, Observable, of, shareReplay} from 'rxjs';
import {MealsPerDay} from "./meal-info";
import {Store} from "@ngrx/store";
import {getMealsInput, mealsSelector, mondayDateSelector, settingsSelector} from "../../store/reducers/calendar";
import {Helper} from "./helper";

@Injectable({
  providedIn: 'root'
})
export class MealsResolver implements Resolve<MealsPerDay[]> {

  constructor(private store: Store){}

  resolve(): Observable<MealsPerDay[]> {
    return combineLatest([
      this.store.select(settingsSelector),
      this.store.select(mealsSelector),
      this.store.select(mondayDateSelector)
    ]).pipe(
      map(([settings, meals, date]) => {
        console.log('meals', meals)
        return Helper.updateMealsPerWeek(meals, date, settings);
      }),
      shareReplay()
    );
  }

  // resolve(): Observable<boolean> {
  //   let flag = false;
  //   this.store.dispatch(getMealsInput({date: Helper.getMondayDate(new Date())}));
  //   //flag = true;
  //   return of(flag);
  // }
}
