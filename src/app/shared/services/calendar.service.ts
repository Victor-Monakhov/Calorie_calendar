import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";


export class MealInfo {
  public key: string;
  public day: number;
  public month: number;
  public year: number;
  public hours: string;
  public name: string = 'My new meal';
  public kcal: number = 0;
  public minutes: string = '00';
  public time: string = '00:00';
  public fats: number = 0;
  public proteins: number = 0;
  public carbohydrates: number = 0;
  constructor(info: string){
      this.key = info;
      let infoData = info.split('|');
      this.day = +infoData[0];
      this.month = +infoData[1];
      this.year = +infoData[2];
      this.hours = infoData[3];
      this.time = this.hours + ':' + this.minutes;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public readonly times: string[] =
    ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  public readonly mealsKey: string = 'meals';
  public readonly tempMealKey: string = 'tempMeal';
  //public meal?: MealInfo;
  public meals$: BehaviorSubject<MealInfo[]> = new BehaviorSubject<MealInfo[]>([]);
  public date: Date = new Date();
  public keys: string[] = [];
  public totalCalories: number[] = [];
  public weekDaysNumbers: string[] = [];

  constructor() {
    for(let i = 0; i < this.times.length * this.weekDays.length; ++i){
      this.keys.push('');
    }
    for(let i = 0; i < this.weekDays.length; ++i){
      this.totalCalories.push(0);
    }
    //this.meal = JSON.parse(localStorage.getItem(this.tempMealKey) as string);
    this.meals$.next(JSON.parse(localStorage.getItem(this.mealsKey) as string) ?? []) ;
  }

  public updateKeys(date: Date): void{
    const day = this.getWeekDay(date);
    for(let i = 0, time = 0; i < this.times.length * this.weekDays.length; i += this.weekDays.length, ++time){
      this.keys[day + i] = `${date.getDate()}|${date.getMonth()}|${date.getFullYear()}|${this.times[time].split(':')[0]}`;
    }
  }

  private getWeekDay(date: Date): number{
    let day: number = date.getDay() - 1;
    if(day === -1){
      day = 6;
    }
    return day;
  }

  public updateState(deltaWeek: number): void{
    this.weekDaysNumbers.length = 0;
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
      this.updateKeys(this.date);
      this.updateTotalCalories(this.date, i);
      this.weekDaysNumbers.push(`${this.date.getDate()}`);
    });
    this.date.setFullYear(constYear);
    this.date.setMonth(constMonth);
    this.date.setDate(constDate);
  }

  public getMealByKey(key: string): MealInfo | undefined{
    return this.meals$.value.find(item => item.key === key);
  }

  //public loadMeal(info: string): MealInfo | undefined{
    //return this.meals$.value.find(item => item.key === info);
    //this.meal = this.meals.find(item => item.key === info);
    // if(!this.meal){
    //   this.meal = new MealInfo(info);
    // }
    //localStorage.setItem(this.tempMealKey, JSON.stringify(this.meal));
  //}

  public updateMeals(meal: MealInfo): void{
    let isEdited: boolean = false;
    const meals = JSON.parse(localStorage.getItem(this.mealsKey) as string);
    for(let i = 0; i < meals.length; ++i){
      if(meals[i].key === meal.key){
        meals[i] = meal;
        isEdited = true;
        break;
      }
    }
    if(!isEdited){
      meals.push(meal);
    }
    this.meals$.next(meals);
    localStorage.removeItem(this.mealsKey);
    localStorage.setItem(this.mealsKey, JSON.stringify(this.meals$.value));
  }

  public updateTotalCalories(date: Date, weekDay:number){
    let caloriesPerDay: number = 0;
    this.meals$.value.forEach(item => {
      if(item.day === date.getDate() &&
          item.month === date.getMonth() &&
          item.year === date.getFullYear()){
        caloriesPerDay += +item.kcal;
      }
    });
    this.totalCalories[weekDay] = caloriesPerDay;
  }

  public updateKey(meal: MealInfo): void {
      meal.hours = meal.time.split(':')[0];
      meal.minutes = meal.time.split(':')[1];
      let keyArr = meal.key.split('|');
      keyArr[3] = meal.hours;
      meal.key = keyArr.join('|');
  }

  public updateMeal(data: AbstractControl){
      // this.meal = {...this.meal, ...(data.value as MealInfo)};
      //Object.assign(this.meal, data.value);
      this.updateKey();
  }

  public removeTempMeal(): void{
    localStorage.removeItem(this.tempMealKey);
  }

  public removeMeals(): void{
    localStorage.removeItem(this.mealsKey);
  }
}
