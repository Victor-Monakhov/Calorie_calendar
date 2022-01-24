import {Component, OnInit} from '@angular/core';
import {CalendarService, MealInfo} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public deltaWeek: number = 0;
  public currentDay: string;
  public date: Date;
  public mealInfo?: string;
  public weekDays: string[];
  public months: string[];
  public times: string[];
  public keys: string[];
  public weekDaysNumbers: string[];
  public totalCalories: number[];
  public meals: MealInfo[];

  constructor(public calendarService: CalendarService, public router: Router) {
    this.weekDays = this.calendarService.weekDays;
    this.months = this.calendarService.months;
    this.times = this.calendarService.times;
    this.keys = this.calendarService.keys;
    this.weekDaysNumbers = this.calendarService.weekDaysNumbers;
    this.date = this.calendarService.date;
    this.meals = this.calendarService.meals;
    this.totalCalories = this.calendarService.totalCalories;
    this.currentDay =
      `${this.calendarService.date.getDate()}${this.calendarService.date.getMonth()}${this.calendarService.date.getFullYear()}`;
  }

  ngOnInit(): void {
    this.calendarService.updateState(this.deltaWeek);
  }

  public onSwipeLeft(){
    this.deltaWeek = this.weekDays.length;
    this.calendarService.updateState(this.deltaWeek);
  }
  public onSwipeRight(){
    this.deltaWeek = -this.weekDays.length;
    this.calendarService.updateState(this.deltaWeek);
  }

  public onFood(info: string){
    this.calendarService.loadMeal(info);
    this.router.navigate(['/meal']);
  }

  public onSettings(){
    this.router.navigate(['/settings']);
  }

  public getMeal(key: string): string{
    const meal = this.meals.find(item => item.key === key);
    if(meal){
      if(+meal.hours < 12){
        return this.mealInfo = `Breakfast\n${meal.name}\n${meal.kcal}`;
      }
      if(+meal.hours >= 12 && +meal.hours <= 17){
        return this.mealInfo = `Dinner\n${meal.name}\n${meal.kcal}`;
      }
      if(+meal.hours > 17){
        return this.mealInfo = `Supper\n${meal.name}\n${meal.kcal}`;
      }
    }
    return this.mealInfo = '';
  }
}
