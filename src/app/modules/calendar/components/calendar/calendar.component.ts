import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Helper} from "../../../../shared/classes/helper";
import {Store} from "@ngrx/store";
import {
  getMealsInput, getSettingsInput, mealsSelector, mondayDateSelector, settingsSelector,
} from "../../../../store/reducers/calendar";
import {SubSink} from "subsink";
import {combineLatest, map, Observable, of, switchMap, take} from "rxjs";
import {MealInfo, MealsPerDay} from "../../../../shared/classes/meal-info";
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
  public date?: Date;
  // private meals$: Observable<MealInfo[]> = this.store.select(mealsSelector);
  // private date$: Observable<Date> = this.store.select(mondayDateSelector);
  // private settings$: Observable<Settings> = this.store.select(settingsSelector);
  public mealsPerWeek$: Observable<MealsPerDay[]> = combineLatest([
    this.store.select(mealsSelector),
    this.store.select(mondayDateSelector),
    this.store.select(settingsSelector)
  ]).pipe(
    map((([meals, date, settings]) => {
      return Helper.updateMealsPerWeek(meals, date, settings);
    })
  ));

  constructor(private store: Store, public router: Router) {
  }

  private getMeals(): void{
    if(this.date){
      this.store.dispatch(getMealsInput({date: this.date}));
    }
  }

  private setNextDate(deltaDays: number): void{
    this.date?.setDate(this.date.getDate() + deltaDays);
  }


  public ngOnInit(): void {
    this.subs.add(this.mealsPerWeek$.subscribe(mealsPerWeek => this.date = mealsPerWeek[0].caloriesInfo.date));
    //this.store.dispatch(getSettingsInput());
    this.getMeals();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onSwipeLeft(): void {
    this.setNextDate(this.weekDays.length);
    this.getMeals();
  }

  public onSwipeRight(): void {
    this.setNextDate(-this.weekDays.length);
    this.getMeals();
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
