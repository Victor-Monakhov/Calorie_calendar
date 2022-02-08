import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {calendarReducer} from "./calendar";
import {CalendarState} from "../../shared/models/calendar-state";

export interface State {
  date: CalendarState;
}

export const reducers: ActionReducerMap<State> = {
  date: calendarReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
