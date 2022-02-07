import {Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarService} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";
import {CaloriesInfo} from "../../../../shared/classes/calories-info";
import {Helper} from "../../../../shared/classes/helper";
import {Store} from "@ngrx/store";
import {
  caloriesPerWeekSelector,
  dateSelector,
  init,
  keysSelector,
  swipeLeft,
  swipeRight
} from "../../../../store/reducers/calendar";
import {SubSink} from "subsink";
import {Observable} from "rxjs";


@Component({
  selector: 'app-calendar.ts',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public readonly weekDays: string[] = Helper.weekDays;
  public readonly months: string[] = Helper.months;
  public readonly times: string[] = Helper.times;
  public currentDate: Date = new Date();
  public date: Date = new Date();
  public date$: Observable<Date> = this.store.select(dateSelector);
  public keys$: Observable<string[]> = this.store.select(keysSelector);
  public caloriesPerWeek$: Observable<CaloriesInfo[]> = this.store.select(caloriesPerWeekSelector);

  constructor(private store: Store, public router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(init({deltaWeek: 0, date: this.date}));
    this.subs.add(this.date$.subscribe(date => this.date = date));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSwipeLeft(): void {
    const deltaWeek = this.weekDays.length;
    this.store.dispatch(swipeLeft({deltaWeek: deltaWeek, date: this.date}));
  }

  public onSwipeRight(): void {
    const deltaWeek = -this.weekDays.length;
    this.store.dispatch(swipeRight({deltaWeek: deltaWeek, date: this.date}));
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
