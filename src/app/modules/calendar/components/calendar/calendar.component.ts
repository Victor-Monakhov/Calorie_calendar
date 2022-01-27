import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";
import {TotalCalories} from "../../../../shared/models/total-calories";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public deltaWeek: number = 0;
  public date: Date;
  public currentDate: Date;
  public mealInfo?: string;
  public weekDays: string[];
  public months: string[];
  public times: string[];
  public keys: string[];
  public totalCalories: TotalCalories[];

  constructor(public calendarService: CalendarService, public router: Router) {
    this.weekDays = this.calendarService.weekDays;
    this.months = this.calendarService.months;
    this.times = this.calendarService.times;
    this.keys = this.calendarService.keys;
    this.date = this.calendarService.date;
    this.totalCalories = this.calendarService.totalCalories;
    this.currentDate = this.calendarService.currentDay;
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
      this.router.navigate(['/meal'], {queryParams: {key: info}});
  }

  public onSettings(){
    this.router.navigate(['/settings']);
  }

  public onTodayMeal(){
    this.router.navigate(['/meal'],
     {queryParams: {key: this.calendarService.createKey(this.currentDate, '06:00'), mode: 'create'}});
  }

  public onDay(kcalAmount: number, day: string, month: string, year: string){
    if(kcalAmount > 0) {
      this.router.navigate(['/day-overview'], {queryParams: {'day': day, 'month': month, 'year': year}});
    }
  }

  public checkCurrentDay(day: string): boolean{
    const dynamicDate = `${day}${this.date.getMonth()}${this.date.getFullYear()}`;
    const currentDate = `${this.currentDate.getDate()}${this.currentDate.getMonth()}${this.currentDate.getFullYear()}`
    return dynamicDate === currentDate;
  }
}
