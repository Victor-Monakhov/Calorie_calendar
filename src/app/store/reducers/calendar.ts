import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store';
import {UserSettings} from "../../shared/classes/user-settings";
import {MealInfo} from "../../shared/classes/meal-info";
import {CaloriesInfo} from "../../shared/classes/calories-info";

export const swipeLeft = createAction('[DATE] swipeLeft', props<{deltaWeek: number}>());
export const swipeRight = createAction('[DATE] swipeRight', props<{deltaWeek: number}>());
export const updateDateState = createAction(
  '[DATE] updateDateState',
  props<{
    date: Date,
    keys: string[],
    caloriesPerWeek: CaloriesInfo[];
  }>());

export interface CalendarState {
  userSettings?: UserSettings;
  meals: MealInfo[];
  date: Date;
  currentDay: Date;
  keys: string[];
  caloriesPerWeek: CaloriesInfo[];
}

export const initialState: CalendarState = {
  meals: [],
  date: new Date(),
  currentDay: new Date(),
  keys: [],
  caloriesPerWeek: [],
};

export const dateReducer = createReducer(
  initialState,
  // on(swipeLeft, state => ({
  //   ...state,
  //   //deltaWeek: state.weekDays.length
  // })),
  // on(swipeRight, state => ({
  //   ...state,
  //   //deltaWeek: -state.weekDays.length
  // })),
  on(updateDateState, (state, action) => ({
    ...state,
    date: action.date,
    keys: action.keys,
    caloriesPerWeek: action.caloriesPerWeek
  })),
);



export const featureSelector = createFeatureSelector<CalendarState>('date');
export const dateSelector = createSelector(
  featureSelector,
  state => state.date
)
export const keysSelector = createSelector(
  featureSelector,
  state => state.keys
)
export const caloriesPerWeekSelector = createSelector(
  featureSelector,
  state => state.caloriesPerWeek
)


