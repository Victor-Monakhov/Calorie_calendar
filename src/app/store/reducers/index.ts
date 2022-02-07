import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {dateReducer, CalendarState} from "./calendar";

export interface State {
  date: CalendarState;
}

export const reducers: ActionReducerMap<State> = {
  date: dateReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
