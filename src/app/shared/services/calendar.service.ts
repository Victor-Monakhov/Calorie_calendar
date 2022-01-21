import { Injectable } from '@angular/core';


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
  public readonly times: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  public readonly mealsKey: string = 'meals';
  public readonly tempMealKey: string = 'tempMeal';
  public meal?: MealInfo;
  public meals: MealInfo[];
  public date: Date = new Date();
  public keys: string[] = [];
  public weekDaysNumbers: string[] = [];

  constructor() {
    for(let i = 0; i < this.times.length * this.weekDays.length; ++i){
      this.keys.push('');
    }
    this.meal = JSON.parse(localStorage.getItem(this.tempMealKey) as string);
    this.meals = JSON.parse(localStorage.getItem(this.mealsKey) as string) ?? [];
  }

  public timeToString(time: number): string{
    if(time < 10){
      return `0${time}`;
    }
    return time.toString();
  }

  public updateKeys(date: Date): void{
    let time = 8;
    const day = this.getWeekDay(date);
    for(let i = 0; i < this.times.length * this.weekDays.length; i += this.weekDays.length){
      this.keys[day + i] = `${date.getDate()}|${date.getMonth()}|${date.getFullYear()}| ${this.timeToString(time)}`;
      ++time;
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
      this.weekDaysNumbers.push(`${this.date.getDate()}\n${item}`);
    });
    this.date.setFullYear(constYear);
    this.date.setMonth(constMonth);
    this.date.setDate(constDate);
  }

  public loadMeal(info: string): void{
    this.meal = this.meals.find(item => item.key === info);
    if(!this.meal){
      this.meal = new MealInfo(info);
      localStorage.setItem(this.tempMealKey, JSON.stringify(this.meal));
    }
  }

  public removeTempMeal(){
    localStorage.removeItem(this.tempMealKey);
  }
}
