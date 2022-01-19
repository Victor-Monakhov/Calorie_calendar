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
  private month: number;
  private swipeDirection?: string = 'left';
  private pastSwipeDirection?: string = 'left';

  constructor() {
    this.month = this.date.getMonth();
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

  private leftSwipeDate(daysInMonth: number, newDaysInMonth:number, constDate: number, constMonth: number, toMonday: number): void{
    this.weekDays.forEach((item, i) => {
      if(daysInMonth > newDaysInMonth || daysInMonth < newDaysInMonth){
        this.date.setMonth(this.date.getMonth() - 1);
        this.date.setDate(constDate - toMonday + i);
        this.date.setMonth(this.month);
      } else {
        this.date.setMonth(constMonth);
        this.date.setDate(constDate - toMonday + i);
      }
      if(this.date.getDate() === 1){
        this.date.setMonth(++this.month);
        newDaysInMonth = this.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
      }
      this.weekDaysNumbers.push(`${this.date.getDate()}\n${this.weekDays[i]}\n${this.date.getMonth()}`);
    });
  }

  private rightSwipeDate(daysInMonth: number, newDaysInMonth:number, constDate: number, constMonth: number, toMonday: number): void{
    this.weekDays.forEach((item, i) => {
      if(daysInMonth > newDaysInMonth || daysInMonth < newDaysInMonth){
        this.date.setMonth(this.date.getMonth() - 1);
        this.date.setDate(constDate - toMonday + i);
        this.date.setMonth(this.month);
      } else {
       this.date.setMonth(constMonth);
       this.date.setDate(constDate - toMonday + i);
      }
      if(this.date.getDate() === 1){
        this.date.setMonth(++this.month);
        newDaysInMonth = this.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
      }
      this.weekDaysNumbers.push(`${this.date.getDate()}\n${this.weekDays[i]}\n${this.date.getMonth()}`);
    });
  }


  public updateWeekDays(){
    const daysInMonth: number = this.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
    let newDaysInMonth: number = daysInMonth;
    this.date.setDate(this.date.getDate() + this.weekCounter);
    const constDate: number = this.date.getDate();
    const constMonth: number = this.date.getMonth();
    const toMonday: number = this.getWeekDay(this.date);
    this.weekDaysNumbers = [];
   if(this.swipeDirection === 'left') {
     // if(this.pastSwipeDirection === 'right'){
     //   --this.month;
     // }
     this.leftSwipeDate(daysInMonth, newDaysInMonth, constDate, constMonth, toMonday);
    }
    if(this.swipeDirection === 'right') {
      //this.month = constMonth;
      // this.pastSwipeDirection === 'left' ||
      // if( this.date.getDate() - 7 < 0){
      //   --this.month;
      // }
      console.log(this.month);
      this.rightSwipeDate(daysInMonth, newDaysInMonth, constDate, constMonth, toMonday);
    }
    this.date.setMonth(constMonth);
    this.date.setDate(constDate);
    this.pastSwipeDirection = this.swipeDirection;
  }

  public onSwipeLeft(){
    this.weekCounter = 7;
    this.swipeDirection = 'left';
    this.updateWeekDays();
  }
  public onSwipeRight(){
    this.weekCounter = -7;
    this.swipeDirection = 'right';
    this.updateWeekDays();
  }
}
