import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store';
import {UserSettings} from "../../shared/classes/user-settings";
import {MealInfo} from "../../shared/classes/meal-info";
import {CaloriesInfo} from "../../shared/classes/calories-info";
import {CalendarState} from "../../shared/models/calendar-state";
import {AbstractControl} from "@angular/forms";

export const swipeLeft = createAction('[CALENDAR] swipeLeft', props<{deltaWeek: number, date: Date}>());
export const swipeRight = createAction('[CALENDAR] swipeRight', props<{deltaWeek: number, date: Date}>());
export const init = createAction('[CALENDAR] init', props<{deltaWeek: number, date: Date}>());
export const updateCalendarState = createAction(
  '[DATE] updateDateState',
  props<{
    data: CalendarState,
  }>());
export const updateMealsInput = createAction('[CALENDAR] updateMealsInput', props<{meal: MealInfo, form: AbstractControl}>());
export const updateMealsOutput = createAction('[CALENDAR] updateMealsOutput', props<{meals: MealInfo[]}>());
export const updateSettingsInput = createAction('[CALENDAR] updateSettingsInput', props<{form: AbstractControl}>());
export const updateSettingsOutput = createAction('[CALENDAR] updateSettingsOutput', props<{settings: UserSettings}>());

export const initialState: CalendarState = {
  meals: [],
  date: new Date(),
  keys: [],
  caloriesPerWeek: [],
  userSettings: new UserSettings(),
};

export const dateReducer = createReducer(
  initialState,
  on(updateCalendarState, (state, action) => ({
    ...state,
    meals: action.data.meals,
    date: action.data.date,
    keys: action.data.keys,
    caloriesPerWeek: action.data.caloriesPerWeek,
    userSettings: action.data.userSettings,
  })),
  on(updateMealsOutput, (state, action) => ({
    ...state,
    meals: action.meals,
  })),
  on(updateSettingsOutput, (state, action) => ({
    ...state,
    userSettings: action.settings,
  }))
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

export const mealsSelector = createSelector(
  featureSelector,
  state => state.meals
)

export const userSettingsSelector = createSelector(
  featureSelector,
  state => state.userSettings
)


