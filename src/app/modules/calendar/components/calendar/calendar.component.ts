import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Helper} from "../../../../shared/classes/helper";
import {Store} from "@ngrx/store";
import {
  getMealsInput, mealsSelector, mondayDateSelector, settingsSelector,
} from "../../../../store/reducers/calendar";
import {SubSink} from "subsink";
import {first, map, Observable, publish, refCount, share, shareReplay, withLatestFrom,} from "rxjs";
import {MealsPerDay} from "../../../../shared/classes/meal-info";
import {Settings} from "../../../../shared/classes/settings";


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
  public date: Date = Helper.getMondayDate(new Date());
  public settings$: Observable<Settings> = this.store.select(settingsSelector);
  public mealsPerWeek$: Observable<MealsPerDay[]> =
    //this.aRoute.snapshot.data['mealsPerWeek'];
    this.store.select(mealsSelector).pipe(
      withLatestFrom(
        this.store.select(settingsSelector),
        this.store.select(mondayDateSelector)
      ),
      map(([meals, settings, date]) => {
        console.log('meals', meals)
        return Helper.updateMealsPerWeek(meals, date, settings);
      }),
      share()
    );

  constructor(private store: Store, public router: Router, private aRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    setTimeout(() =>this.store.dispatch(getMealsInput({date: this.date})), 0);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private setNextDate(deltaDays: number): void {
    this.date?.setDate(this.date.getDate() + deltaDays);
  }


  public onSwipeLeft(): void {
    console.log('left');
    this.setNextDate(this.weekDays.length);
    this.store.dispatch(getMealsInput({date: this.date}));
  }

  public onSwipeRight(): void {
    console.log('right');
    this.setNextDate(-this.weekDays.length);
    this.store.dispatch(getMealsInput({date: this.date}));
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

  public onDay(kcalAmount: number, key: string): void {
    if (kcalAmount > 0) {
      this.router.navigate(['/day-overview'],
        {queryParams: {'key': key}});
    }
  }

  public checkCurrentDay(date: Date): boolean {
    const dynamicDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
    const currentDate = `${this.currentDate.getDate()}${this.currentDate.getMonth()}${this.currentDate.getFullYear()}`
    return dynamicDate === currentDate;
  }
}
