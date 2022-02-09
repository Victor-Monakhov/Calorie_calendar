import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
  getMealsInput,
  getMealsOutput,
  getSettingsInput,
  getSettingsOutput,
  updateMealsInput,
  updateSettingsInput
} from "../reducers/calendar";
import {catchError, map, switchMap, tap} from "rxjs";
import {CalendarService} from "../../shared/services/calendar.service";
import {StorageService} from "../../shared/services/storage.service";
import {Helper} from "../../shared/classes/helper";

@Injectable()
export class AppEffects {

  getMeals$ = createEffect(() => this.actions$.pipe(
    ofType(getMealsInput),
    map((action) => {
      const date = action.date;
      const meals = this.calendarService.getMeals(date);
      return getMealsOutput({
        'meals': meals,
        'mondayDate': date,
      });
    })
  ));

  updateMeals$ = createEffect( () => this.actions$.pipe(
    ofType(updateMealsInput),
    tap((action) => {
      this.calendarService.updateMeals(action.meal, action.form);
    }),
  ), {dispatch: false});

  updateSettings$ = createEffect(() => this.actions$.pipe(
    ofType(updateSettingsInput),
    map((action) => {
      const settings = this.calendarService.updateSettings(action.form);
      return getSettingsOutput({
        'settings': settings,
      });
    })
  ));

  getSettings$ = createEffect(() => this.actions$.pipe(
    ofType(getMealsOutput),
    map((action) => {
      const settings = this.storageService.getSettings();
      return getSettingsOutput({
        'settings': settings,
      });
    })
  ));

  constructor(private actions$: Actions,
              private calendarService: CalendarService,
              private storageService: StorageService) {
  }
}
