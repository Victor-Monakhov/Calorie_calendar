import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  init,
  swipeLeft,
  swipeRight,
  updateCalendarState,
  updateMealsInput,
  updateMealsOutput,
  updateSettingsInput, updateSettingsOutput
} from "../reducers/calendar";
import {map} from "rxjs";
import {CalendarService} from "../../shared/services/calendar.service";

@Injectable()
export class AppEffects {

  updateDateState$ = createEffect(() => this.actions$.pipe(
    ofType(swipeLeft, swipeRight, init),
    map((action) => {
      const data = this.calendarService.updateState(action.deltaWeek, action.date);
      return updateCalendarState({
        'data': data,
      });
    })
  ));

  updateMeals$ = createEffect(() => this.actions$.pipe(
    ofType(updateMealsInput),
    map((action) => {
      const meals = this.calendarService.updateMeals(action.meal, action.form);
      return updateMealsOutput({
        'meals': meals,
      });
    })
  ));

  userSettings$ = createEffect(() => this.actions$.pipe(
    ofType(updateSettingsInput),
    map((action) => {
      const settings = this.calendarService.updateUserSettings(action.form);
      return updateSettingsOutput({
        'settings': settings,
      });
    })
  ));

  constructor(private actions$: Actions, private calendarService: CalendarService) {
  }
}
