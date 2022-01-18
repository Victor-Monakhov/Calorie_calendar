import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HammerGestureConfig} from "@angular/platform-browser";
import {fromEvent, switchMap, takeWhile} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  public readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public weekDaysNumbers: string[] = [];
  public weekCounter: number = 0;
  public date: Date = new Date();
  public tmpDate?:Date;
  public hammerConfig = new HammerGestureConfig()

  @ViewChild('temp') public element?: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
    this.updateWeekDays();

  }
  ngAfterViewInit() {
    const hammer=this.hammerConfig.buildHammer(this.element?.nativeElement as HTMLElement)
    fromEvent(hammer, "swipeleft")
      .subscribe((res: any) => {
        this.onSwipeLeft();
      });
    fromEvent(hammer, "swiperight")
      .subscribe((res: any) => {
        console.log('hi');
      })
  }


  public updateWeekDays(){
    let daysInMonth: number = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    const cloneDate: Date = new Date();
    let sum = this.weekCounter + this.date.getDate();
    this.date.setDate(this.date.getDate() + this.weekCounter);
    console.log(this.date.getMonth());
    if(sum > daysInMonth){
      this.date.setMonth(this.date.getMonth());
    }
    cloneDate.setMonth(this.date.getMonth());
    let day: number = this.date.getDay() - 1;
    if(day === -1){
      day = 6;
    }
    this.weekDaysNumbers.length = 0;
    for(let i = 0; i < this.weekDays.length; ++i ) {
      cloneDate.setDate(this.date.getDate() - day + i);
      this.weekDaysNumbers.push(`${cloneDate.getDate()}\n${this.weekDays[i]}\n${cloneDate.getMonth()}`);
    }
    this.tmpDate = cloneDate;
  }

  public onSwipeLeft(){
    this.weekCounter = 7;
    this.updateWeekDays();
  }
}
