import {Settings} from "../classes/settings";
import {MealInfo} from "../classes/meal-info";

export interface CalendarState {
  mondayDate: Date,
  settings: Settings,
  meals: MealInfo[],
}
