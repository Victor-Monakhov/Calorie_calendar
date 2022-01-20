import {AfterViewInit, Component, OnInit} from '@angular/core';


export class FoodInfo{
  public date?: Date;
  public name: string = 'food';
  constructor(date: Date, name: string = 'food'){
    this.date = new Date(date);
  }
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  public readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public readonly times: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  public columns: number[] = [];
  public rows: number[] = [];
  public weekDaysNumbers: string[] = [];
  public deltaWeek: number = 0;
  public date: Date = new Date();
  public meals: string[] = [];

  constructor() {
    for(let i = 0; i < 7; ++i){
      this.columns.push(i);
    }
    for(let i = 0; i < 15; ++i){
      this.rows.push(i);
    }
    for(let i = 0; i < 15 * 7; ++i){
        this.meals[i] = '';
    }
  }

  ngOnInit(): void {
    this.updateWeekDays();
  }

  ngAfterViewInit() {
  }

  private getWeekDay(date: Date): number{
    let day: number = date.getDay() - 1;
    if(day === -1){
      day = 6;
    }
    return day;
  }

  public initMeals(date: Date){
    let time = 8;
    const day = this.getWeekDay(date);
    for(let i = 0; i < 15 * 7; i += 7){
        this.meals[day + i] = (`${day}|${date.getDate()}|${date.getMonth()}|${date.getFullYear()}|${time}`);
      ++time;
    }
  }

  public updateWeekDays(){
    this.weekDaysNumbers = [];
    this.date.setDate(this.date.getDate() + this.deltaWeek);
    const constDate: number = this.date.getDate();
    const constMonth: number = this.date.getMonth();
    const constYear: number = this.date.getFullYear();
    const toMonday: number = this.getWeekDay(this.date);
    this.weekDays.forEach((item, i) => {
      this.date.setDate(1);
      this.date.setMonth(constMonth);
      this.date.setFullYear(constYear);
      this.date.setDate(constDate - toMonday + i);
      this.initMeals(this.date);
      this.weekDaysNumbers.push(`${this.date.getDate()}\n${item}`);
    });
    this.date.setFullYear(constYear);
    this.date.setMonth(constMonth);
    this.date.setDate(constDate);
  }

  public onSwipeLeft(){
    this.deltaWeek = 7;
    this.updateWeekDays();
  }
  public onSwipeRight(){
    this.deltaWeek = -7;
    this.updateWeekDays();
  }

  public onFood(info: string){
    console.log(info.split('|'));
  }
}
