import {CaloriesInfo} from "../classes/calories-info";
import {UserSettings} from "../classes/user-settings";
import {MealInfo} from "../classes/meal-info";

export interface CalendarState {
  date: Date,
  keys: string[],
  caloriesPerWeek: CaloriesInfo[],
  userSettings: UserSettings,
  meals: MealInfo[],
}
