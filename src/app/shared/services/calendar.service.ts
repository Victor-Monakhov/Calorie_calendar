import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MealInfo} from "../classes/meal-info";
import {UserSettings} from "../classes/user-settings";
import {TotalCalories} from "../classes/total-calories";


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public readonly times: string[] =
    ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  public readonly mealsKey: string = 'meals';
  public readonly settingsKey: string = 'settings';
  public readonly caloriesKey: string = 'calories';
  public userSettings: UserSettings;
  public meals$: BehaviorSubject<MealInfo[]> = new BehaviorSubject<MealInfo[]>([]);
  public date: Date = new Date();
  public currentDay: Date = new Date();
  public keys: string[] = [];
  public totalCalories: TotalCalories[] = [];

  constructor() {
    for (let i = 0; i < this.times.length * this.weekDays.length; ++i) {
      this.keys.push('');
    }
    const totalCalories = JSON.parse(localStorage.getItem(this.caloriesKey) as string) ?? new TotalCalories();
    for (let i = 0; i < this.weekDays.length; ++i) {
      this.totalCalories.push(new TotalCalories());
      Object.assign(this.totalCalories[i], totalCalories[i]);
    }
    this.userSettings = JSON.parse(localStorage.getItem(this.settingsKey) as string) ?? new UserSettings();
    this.meals$.next(JSON.parse(localStorage.getItem(this.mealsKey) as string) ?? []);
  }

  private keysInit(date: Date, weekDay: number) {
    for (let i = 0, time = 0; i < this.times.length * this.weekDays.length; i += this.weekDays.length, ++time) {
      this.keys[weekDay + i] = this.createKey(date, this.times[time]);
    }
  }

  private getWeekDay(date: Date): number {
    let day: number = date.getDay() - 1;
    if (day === -1) {
      day = 6;
    }
    return day;
  }

  private updateDayState(date: Date, weekDay: number): void {
    this.keysInit(date, weekDay);
    const totalKcal = this.totalCalories[weekDay];
    let calories: number = 0;
    let fats: number = 0;
    let proteins: number = 0;
    let carbohydratesPerDay: number = 0;
    this.meals$.value.forEach(item => {
      if (item.day === date.getDate() &&
        item.month === date.getMonth() &&
        item.year === date.getFullYear()) {
        calories += +item.kcal;
        fats += +item.fats;
        proteins += +item.proteins;
        carbohydratesPerDay += +item.carbohydrates;
      }
    });
    totalKcal.day = `${date.getDate()}`;
    totalKcal.month = `${date.getMonth()}`;
    totalKcal.year = `${date.getFullYear()}`;
    totalKcal.amount = calories;
    totalKcal.fats = fats;
    totalKcal.proteins = proteins;
    totalKcal.carbohydrates = carbohydratesPerDay;
    totalKcal.status = totalKcal.getStatus(this.userSettings.minKcal, this.userSettings.maxKcal, totalKcal.amount);
    totalKcal.fatsStatus = totalKcal.getStatus(this.userSettings.fats, this.userSettings.fats, totalKcal.fats);
    totalKcal.proteinsStatus = totalKcal.getStatus(this.userSettings.proteins, this.userSettings.proteins, totalKcal.proteins);
    totalKcal.carbohydratesStatus = totalKcal.getStatus(this.userSettings.carbohydrates, this.userSettings.carbohydrates, totalKcal.carbohydrates);
  }

  public updateState(deltaWeek: number): void {
    this.date.setDate(this.date.getDate() + deltaWeek);
    const constDate: number = this.date.getDate();
    const constMonth: number = this.date.getMonth();
    const constYear: number = this.date.getFullYear();
    const toMonday: number = this.getWeekDay(this.date);
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
    localStorage.removeItem(this.caloriesKey);
    localStorage.setItem(this.caloriesKey, JSON.stringify(this.totalCalories));
  }

  public updateMeals(meal: MealInfo, form: AbstractControl): void {
    Object.assign(meal, form.value);
    this.updateKey(meal);
    let isEdited: boolean = false;
    const meals = JSON.parse(localStorage.getItem(this.mealsKey) as string) ?? [];
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
    localStorage.removeItem(this.mealsKey);
    localStorage.setItem(this.mealsKey, JSON.stringify(this.meals$.value));
  }

  public createKey(date: Date, time: string): string {
    return `${date.getDate()}|${date.getMonth()}|${date.getFullYear()}|${time.split(':')[0]}`
  }

  public getMealByKey(key: string): MealInfo | undefined {
    return this.meals$.value.find(item => item.key === key);
  }

  public getTotalCalories(day: number, month: number, year: number): TotalCalories | undefined {
    return this.totalCalories.find(totalCalories => {
      return +totalCalories.day === day &&
        +totalCalories.month === month &&
        +totalCalories.year === year;
    })
  }

  public updateKey(meal: MealInfo): void {
    meal.hours = meal.time.split(':')[0];
    meal.minutes = meal.time.split(':')[1];
    let keyArr = meal.key.split('|');
    keyArr[3] = meal.hours;
    meal.key = keyArr.join('|');
  }

  public updateUserSettings(form: AbstractControl): void {
    Object.assign(this.userSettings, form.value);
    localStorage.removeItem(this.settingsKey);
    localStorage.setItem(this.settingsKey, JSON.stringify(this.userSettings));
  }

  public getMealsPerDey(day: number, month: number, year: number): MealInfo[] {
    return this.meals$.value.filter(meal => {
      return meal.day === day &&
        meal.month === month &&
        meal.year === year;
    });
  }

  public removeMeals(): void {
    localStorage.removeItem(this.mealsKey);
  }
}
