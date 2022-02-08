import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MealInfo} from "../classes/meal-info";
import {Settings} from "../classes/settings";
import {CaloriesInfo} from "../classes/calories-info";
import {Helper} from "../classes/helper";
import {StorageService} from "./storage.service";
import {StorageKeys} from "../enums/storage-keys";
import {CalendarState} from "../models/calendar-state";


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private storageService: StorageService) {
  }
  // private updateDate(date: Date){
  //   let tmpDate = new Date();
  //   tmpDate.s
  // }

  public getMeals(date: Date): MealInfo[]{
    const allMeals = this.storageService.getMeals();
    const meals: MealInfo[] = [];
    if(allMeals.length) {
      const dateClone = new Date(date);
      const day = dateClone.getDate();
      const month = dateClone.getMonth();
      const year = dateClone.getFullYear();
      Helper.weekDays.forEach((item, i) => {
        dateClone.setDate(1);
        dateClone.setMonth(month);
        dateClone.setFullYear(year);
        dateClone.setDate(day + i);
        allMeals.forEach(meal => {
          if (meal.date.getDate() === dateClone.getDate() &&
            meal.date.getMonth() === dateClone.getMonth() &&
            meal.date.getFullYear() === dateClone.getFullYear()) {
            meals.push(meal);
          }
        });
      })
    }
    return meals;
  }

    public updateMeals(meal: MealInfo, form: AbstractControl): MealInfo[] {
    const tmpMeal = new MealInfo(meal.key);
    Object.assign(tmpMeal, form);
    let isEdited: boolean = false;
    const meals = this.storageService.getMeals();
    for (let i = 0; i < meals.length; ++i) {
      if (meals[i].key === meal.key) {
        meals[i] = tmpMeal;
        isEdited = true;
        break;
      }
    }
    Helper.updateKey(tmpMeal);
    if (!isEdited) {
      meals.push(tmpMeal);
    }
    this.storageService.setItem(StorageKeys.mealsKey, meals);
    return this.getMeals(Helper.getMondayDate(meal.date));
  }

    public updateSettings(form: AbstractControl): Settings {
    const settings = this.storageService.getSettings();
    Object.assign(settings, form);
    this.storageService.setItem(StorageKeys.settingsKey, settings);
    return settings;
  }






  // private getStateData(date: Date){
  //   return {
  //     'date': date,
  //     'keys': Helper.keysInitEmpty(),
  //     'caloriesPerWeek': this.storageService.getCaloriesPerWeek(),
  //     'userSettings': this.storageService.getUserSettings(),
  //     'meals': this.storageService.getMeals(),
  //   } as CalendarState;
  // }

  // private keysInit(data: CalendarState, weekDay: number) {
  //   for (let i = 0, time = 0; i < Helper.times.length * Helper.weekDays.length; i += Helper.weekDays.length, ++time) {
  //       data.keys[weekDay + i] = Helper.createKey(data.date, Helper.times[time]);
  //   }
  // }
  //
  // private updateDayState(data: CalendarState, weekDay: number): void {
  //   this.keysInit(data, weekDay);
  //   const caloriesInfo = new CaloriesInfo();
  //   data.meals.forEach(item => {
  //     if (item.day === data.date.getDate() &&
  //       item.month === data.date.getMonth() &&
  //       item.year === data.date.getFullYear()) {
  //       caloriesInfo.amount += +item.kcal;
  //       caloriesInfo.fats += +item.fats;
  //       caloriesInfo.proteins += +item.proteins;
  //       caloriesInfo.carbohydrates += +item.carbohydrates;
  //     }
  //   });
  //   caloriesInfo.day = `${data.date.getDate()}`;
  //   caloriesInfo.month = `${data.date.getMonth()}`;
  //   caloriesInfo.year = `${data.date.getFullYear()}`;
  //   caloriesInfo.status = caloriesInfo.getStatus(data.userSettings.minKcal, data.userSettings.maxKcal, caloriesInfo.amount);
  //   caloriesInfo.fatsStatus = caloriesInfo.getStatus(data.userSettings.fats, data.userSettings.fats, caloriesInfo.fats);
  //   caloriesInfo.proteinsStatus = caloriesInfo.getStatus(data.userSettings.proteins, data.userSettings.proteins, caloriesInfo.proteins);
  //   caloriesInfo.carbohydratesStatus = caloriesInfo.getStatus(data.userSettings.carbohydrates, data.userSettings.carbohydrates, caloriesInfo.carbohydrates);
  //   Object.assign(data.caloriesPerWeek[weekDay], caloriesInfo);
  // }

//   public updateState(deltaWeek: number, date: Date): CalendarState {
//     const data: CalendarState = this.getStateData(date);
//     data.date.setDate(data.date.getDate() + deltaWeek);
//     const constDate: number = data.date.getDate();
//     const constMonth: number = data.date.getMonth();
//     const constYear: number = data.date.getFullYear();
//     const toMonday: number = Helper.getWeekDay(data.date);
//     Helper.weekDays.forEach((item, i) => {
//       data.date.setDate(1);
//       data.date.setMonth(constMonth);
//       data.date.setFullYear(constYear);
//       data.date.setDate(constDate - toMonday + i);
//       this.updateDayState(data, i);
//     });
//     data.date.setFullYear(constYear);
//     data.date.setMonth(constMonth);
//     data.date.setDate(constDate);
//     this.storageService.setItem(StorageKeys.caloriesKey, data.caloriesPerWeek);
//     return data;
//   }
//

//
 }
