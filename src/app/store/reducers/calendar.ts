import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store';
import {Settings} from "../../shared/classes/settings";
import {MealInfo} from "../../shared/classes/meal-info";
import {CalendarState} from "../../shared/models/calendar-state";
import {AbstractControl} from "@angular/forms";
import {Helper} from "../../shared/classes/helper";

export const getMealsInput = createAction('[CALENDAR] getMealsInput', props<{date: Date}>());
export const getMealsOutput = createAction('[CALENDAR] getMealsOutput', props<{meals: MealInfo[], mondayDate: Date}>());
export const getSettingsInput = createAction('[CALENDAR] getSettings');
export const getSettingsOutput = createAction('[CALENDAR] getSettings', props<{settings: Settings}>());
export const updateMealsInput = createAction('[CALENDAR] updateMealsInput', props<{meal: MealInfo, form: AbstractControl}>());
export const updateSettingsInput = createAction('[CALENDAR] updateSettingsInput', props<{form: AbstractControl}>());


export const initialState: CalendarState = {
  meals: [],
  mondayDate: Helper.getMondayDate(new Date()),
  settings: new Settings(),
};

export const calendarReducer = createReducer(
  initialState,
  on(getMealsOutput, (state, action) => ({
    ...state,
      meals: action.meals,
      mondayDate: action.mondayDate,
  })),
  on(getSettingsOutput, (state, action) => ({
    ...state,
      settings: action.settings,
  })),
);



export const featureSelector = createFeatureSelector<CalendarState>('date');
export const mondayDateSelector = createSelector(
  featureSelector,
  state => state.mondayDate
)

export const mealsSelector = createSelector(
  featureSelector,
  state => state.meals
)

export const settingsSelector = createSelector(
  featureSelector,
  state => state.settings
)
// export const caloriesPerWeekSelector = createSelector(
//   featureSelector,
//   state => state.caloriesPerWeek
// )
//



