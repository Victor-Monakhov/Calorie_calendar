import {Injectable} from '@angular/core';
import {CaloriesInfo} from "../classes/calories-info";
import {Settings} from "../classes/settings";
import {MealInfo} from "../classes/meal-info";
import {StorageKeys} from "../enums/storage-keys";
import {Helper} from "../classes/helper";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public getCaloriesPerWeek(): CaloriesInfo[] {
    const totalCalories = JSON.parse(localStorage.getItem(StorageKeys.caloriesKey) as string) ?? [];
    const resultTotalCalories = [];
    for (let i = 0; i < Helper.weekDays.length; ++i) {
      resultTotalCalories.push(new CaloriesInfo());
      Object.assign(resultTotalCalories[i], totalCalories[i]);
    }
    return resultTotalCalories;
  }

  public getSettings(): Settings {
    return JSON.parse(localStorage.getItem(StorageKeys.settingsKey) as string) ?? new Settings();
  }

  public getMeals(): MealInfo[] {
    return JSON.parse(localStorage.getItem(StorageKeys.mealsKey) as string) ?? [];
  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem(StorageKeys.token) as string) ?? '';
  }

  public setItem(storageKey: StorageKeys, value: any): void {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }
}
