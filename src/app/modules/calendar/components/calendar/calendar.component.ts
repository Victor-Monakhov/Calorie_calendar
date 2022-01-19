import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public weekDaysNumbers: string[] = [];
  public weekCounter: number = 0;
  public date: Date = new Date();

  constructor() {
  }

  ngOnInit(): void {
    this.updateWeekDays();
  }

  private getDaysInMonth(year: number, month: number): number{
    return new Date(year, month + 1, 0).getDate();
  }

  private getWeekDay(date: Date): number{
    let day: number = date.getDay() - 1;
    if(day === -1){
      day = 6;
    }
    return day;
  }

  public updateWeekDays(){
    this.weekDaysNumbers = [];
    this.date.setDate(this.date.getDate() + this.weekCounter);
    const constDate: number = this.date.getDate();
    const constMonth: number = this.date.getMonth();
    const constYear: number = this.date.getFullYear();
    const toMonday: number = this.getWeekDay(this.date);
    this.weekDays.forEach((item, i) => {
      this.date.setDate(1);
      this.date.setMonth(constMonth);
      this.date.setFullYear(constYear);
      this.date.setDate(constDate - toMonday + i);
      this.weekDaysNumbers.push(`${this.date.getDate()}\n${this.weekDays[i]}`);
    });
    this.date.setFullYear(constYear);
    this.date.setMonth(constMonth);
    this.date.setDate(constDate);
    console.log(this.date.getFullYear());
  }

  public onSwipeLeft(){
    this.weekCounter = 7;
    this.updateWeekDays();
  }
  public onSwipeRight(){
    this.weekCounter = -7;
    this.updateWeekDays();
  }
}
