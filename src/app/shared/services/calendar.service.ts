import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MealInfo} from "../classes/meal-info";
import {UserSettings} from "../classes/user-settings";
import {CaloriesInfo} from "../classes/calories-info";
import {Helper} from "../classes/helper";
import {StorageService} from "./storage.service";
import {StorageKeys} from "../enums/storage-keys";


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public readonly times: string[] =
    ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  public userSettings: UserSettings;
  public meals$: BehaviorSubject<MealInfo[]> = new BehaviorSubject<MealInfo[]>([]);
  public date: Date = new Date();
  public currentDay: Date = new Date();
  public keys: string[] = [];
  public caloriesPerWeek: CaloriesInfo[] = [];

  constructor(private storageService: StorageService) {
    this.keys = Helper.keysInitEmpty(this.weekDays.length, this.times.length);
    this.caloriesPerWeek = storageService.getCaloriesPerWeek(this.weekDays.length);
    this.userSettings = storageService.getUserSettings();
    this.meals$.next(storageService.getMeals());
  }

  private keysInit(date: Date, weekDay: number) {
    for (let i = 0, time = 0; i < this.times.length * this.weekDays.length; i += this.weekDays.length, ++time) {
      //console.log(weekDay + i);
      //try{
        this.keys[weekDay + i] = Helper.createKey(date, this.times[time]);
      // }
      // catch (ex: any){
      //   console.log(ex);
      // }
    }
  }

  private updateDayState(date: Date, weekDay: number): void {
    this.keysInit(date, weekDay);
    const caloriesInfo = new CaloriesInfo();
    this.meals$.value.forEach(item => {
      if (item.day === date.getDate() &&
        item.month === date.getMonth() &&
        item.year === date.getFullYear()) {
        caloriesInfo.amount += +item.kcal;
        caloriesInfo.fats += +item.fats;
        caloriesInfo.proteins += +item.proteins;
        caloriesInfo.carbohydrates += +item.carbohydrates;
      }
    });
    caloriesInfo.day = `${date.getDate()}`;
    caloriesInfo.month = `${date.getMonth()}`;
    caloriesInfo.year = `${date.getFullYear()}`;
    caloriesInfo.status = caloriesInfo.getStatus(this.userSettings.minKcal, this.userSettings.maxKcal, caloriesInfo.amount);
    caloriesInfo.fatsStatus = caloriesInfo.getStatus(this.userSettings.fats, this.userSettings.fats, caloriesInfo.fats);
    caloriesInfo.proteinsStatus = caloriesInfo.getStatus(this.userSettings.proteins, this.userSettings.proteins, caloriesInfo.proteins);
    caloriesInfo.carbohydratesStatus = caloriesInfo.getStatus(this.userSettings.carbohydrates, this.userSettings.carbohydrates, caloriesInfo.carbohydrates);
    Object.assign(this.caloriesPerWeek[weekDay], caloriesInfo);
  }

  public updateState(deltaWeek: number): void {
    this.date.setDate(this.date.getDate() + deltaWeek);
    const constDate: number = this.date.getDate();
    const constMonth: number = this.date.getMonth();
    const constYear: number = this.date.getFullYear();
    const toMonday: number = Helper.getWeekDay(this.date);
    this.weekDays.forEach((item, i) => {
      this.date.setDate(1);
      this.date.setMonth(constMonth);
      this.date.setFullYear(constYear);
      this.date.setDate(constDate - toMonday + i);
      this.updateDayState(this.date, i);
    });
    this.date.setFullYear(constYear);
    this.date.setMonth(constMonth);
    this.date.setDate(constDate);
    this.storageService.setItem(StorageKeys.caloriesKey, this.caloriesPerWeek);
    console.log('hello');
  }

  public updateMeals(meal: MealInfo, form: AbstractControl): void {
    Object.assign(meal, form.value);
    Helper.updateKey(meal);
    let isEdited: boolean = false;
    const meals = this.meals$.value;
    for (let i = 0; i < meals.length; ++i) {
      if (meals[i].key === meal.key) {
        meals[i] = meal;
        isEdited = true;
        break;
      }
    }
    if (!isEdited) {
      meals.push(meal);
    }
    this.meals$.next(meals);
    this.storageService.setItem(StorageKeys.mealsKey, this.meals$.value);
  }

  public getMealByKey(key: string): MealInfo | undefined {
    return this.meals$.value.find(item => item.key === key);
  }

  public getCaloriesInfo(day: number, month: number, year: number): CaloriesInfo | undefined {
    return this.caloriesPerWeek.find(caloriesInfo => {
      return +caloriesInfo.day === day &&
        +caloriesInfo.month === month &&
        +caloriesInfo.year === year;
    })
  }

  public updateUserSettings(form: AbstractControl): void {
    Object.assign(this.userSettings, form.value);
    this.storageService.setItem(StorageKeys.settingsKey, this.userSettings);
  }

  public getMealsPerDey(day: number, month: number, year: number): MealInfo[] {
    return this.meals$.value.filter(meal => {
      return meal.day === day &&
        meal.month === month &&
        meal.year === year;
    });
  }
}
