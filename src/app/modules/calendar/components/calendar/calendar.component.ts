import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public deltaWeek: number = 0;
  public date: Date;
  public weekDays: string[];
  public months: string[];
  public times: string[];
  public keys: string[];
  public weekDaysNumbers: string[];

  constructor(public calendarService: CalendarService, public router: Router) {
    this.weekDays = this.calendarService.weekDays;
    this.months = this.calendarService.months;
    this.times = this.calendarService.times;
    this.keys = this.calendarService.keys;
    this.weekDaysNumbers = this.calendarService.weekDaysNumbers;
    this.date = this.calendarService.date;
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
}
