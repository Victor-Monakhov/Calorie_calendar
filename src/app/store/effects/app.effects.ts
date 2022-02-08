import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  getMealsInput,
  getMealsOutput,
  getSettingsInput,
  getSettingsOutput,
  updateMealsInput,
  updateSettingsInput
} from "../reducers/calendar";
import {map} from "rxjs";
import {CalendarService} from "../../shared/services/calendar.service";
import {StorageService} from "../../shared/services/storage.service";
import {Helper} from "../../shared/classes/helper";

@Injectable()
export class AppEffects {

  getMeals$ = createEffect(() => this.actions$.pipe(
    ofType(getMealsInput),
    map((action) => {
      const meals = this.calendarService.getMeals(action.date);
      return getMealsOutput({
        'meals': meals,
        'mondayDate': action.date,
      });
    })
  ));

  updateMeals$ = createEffect( () => this.actions$.pipe(
    ofType(updateMealsInput),
    map((action) => {
      const meals = this.calendarService.updateMeals(action.meal, action.form);
      return getMealsOutput({
        'meals': meals,
        'mondayDate': Helper.getMondayDate(action.meal.date),
      });
    })
  ));

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
    ofType(getSettingsInput),
    map((action) => {
      const settings = this.storageService.getSettings();
      return getSettingsOutput({
        'settings': settings,
      });
    })
  ));

  constructor(private actions$: Actions, private calendarService: CalendarService, private storageService: StorageService) {
  }
}
