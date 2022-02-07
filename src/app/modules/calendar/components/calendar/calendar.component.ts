import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";
import {CaloriesInfo} from "../../../../shared/classes/calories-info";
import {Helper} from "../../../../shared/classes/helper";
import {Store} from "@ngrx/store";
import {swipeLeft, swipeRight} from "../../../../store/reducers/calendar";


@Component({
  selector: 'app-calendar.ts',
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
  public caloriesPerWeek: CaloriesInfo[];

  constructor(private store: Store, public calendarService: CalendarService, public router: Router) {
    this.weekDays = this.calendarService.weekDays;
    this.months = this.calendarService.months;
    this.times = this.calendarService.times;
    this.keys = this.calendarService.keys;
    this.date = this.calendarService.date;
    this.caloriesPerWeek = this.calendarService.caloriesPerWeek;
    this.currentDate = this.calendarService.currentDay;
  }

  ngOnInit(): void {
    this.calendarService.updateState(this.deltaWeek);
  }

  public onSwipeLeft(): void {
    this.deltaWeek = this.weekDays.length;
    this.store.dispatch(swipeLeft({deltaWeek: this.deltaWeek}));
    //this.calendarService.updateState(this.deltaWeek);
  }

  public onSwipeRight(): void {
    this.deltaWeek = -this.weekDays.length;
    this.store.dispatch(swipeRight({deltaWeek: this.deltaWeek}));
    //this.calendarService.updateState(this.deltaWeek);
  }

  public onFood(info: string): void {
    this.router.navigate(['/meal'], {queryParams: {key: info}});
  }

  public onSettings(): void {
    this.router.navigate(['/settings']);
  }

  public onTodayMeal(): void {
    const key = Helper.createKey(this.currentDate, '06:00')
    this.router.navigate(['/meal'],
      {queryParams: {'key': key, mode: 'create'}});
  }

  public onDay(kcalAmount: number, day: string, month: string, year: string): void {
    if (kcalAmount > 0) {
      this.router.navigate(['/day-overview'],
        {queryParams: {'day': day, 'month': month, 'year': year}});
    }
  }

  public checkCurrentDay(day: string): boolean {
    const dynamicDate = `${day}${this.date.getMonth()}${this.date.getFullYear()}`;
    const currentDate = `${this.currentDate.getDate()}${this.currentDate.getMonth()}${this.currentDate.getFullYear()}`
    return dynamicDate === currentDate;
  }
}
