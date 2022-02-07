import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {swipeLeft, swipeRight, updateDateState} from "../reducers/calendar";
import {map} from "rxjs";
import {CalendarService} from "../../shared/services/calendar.service";

@Injectable()
export class AppEffects {

  updateDateState$ = createEffect(() => this.actions$.pipe(
    ofType(swipeLeft, swipeRight),
    map((action) => {
      this.calendarService.updateState(action.deltaWeek);
      return updateDateState({
        date: this.calendarService.date,
        keys: this.calendarService.keys,
        caloriesPerWeek: this.calendarService.caloriesPerWeek
      });
    })
  ));

  constructor(private actions$: Actions, private calendarService: CalendarService) {
  }

}
