import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../../../../shared/services/calendar.service";
import {MealInfo} from "../../../../shared/classes/meal-info";
import {UserSettings} from "../../../../shared/classes/user-settings";
import {CaloriesInfo} from "../../../../shared/classes/calories-info";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {caloriesPerWeekSelector, mealsSelector, userSettingsSelector} from "../../../../store/reducers/calendar";
import {Helper} from "../../../../shared/classes/helper";
import {SubSink} from "subsink";

@Component({
  selector: 'app-day-overview',
  templateUrl: './day-overview.component.html',
  styleUrls: ['./day-overview.component.scss']
})
export class DayOverviewComponent implements OnInit, OnDestroy {

  public subs: SubSink = new SubSink();
  public meals: MealInfo[] = [];
  public months: string[] = Helper.months;
  public isCurrentDay: boolean = false;
  public currentDay: Date = new Date();
  public day: number = 0;
  public month: number = 0;
  public year: number = 0;
  public meals$: Observable<MealInfo[]> = this.store.select(mealsSelector);
  public caloriesPerWeek$: Observable<CaloriesInfo[]> = this.store.select(caloriesPerWeekSelector);
  public userSettings$: Observable<UserSettings> = this.store.select(userSettingsSelector);
  public totalCalories?: CaloriesInfo;

  constructor(private store: Store,
              private router: Router,
              private aRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.day = +this.aRoute.snapshot.queryParams['day'];
    this.month = +this.aRoute.snapshot.queryParams['month'];
    this.year = +this.aRoute.snapshot.queryParams['year'];
    this.subs.add(this.meals$.subscribe(meals => {
      this.meals = meals.filter(meal => meal.day === this.day && meal.month === this.month && meal.year === this.year);
    }));
    this.subs.add(this.caloriesPerWeek$.subscribe(kcalPerWeek => {
      this.totalCalories = kcalPerWeek.find(caloriesInfo => {
        return +caloriesInfo.day === this.day && +caloriesInfo.month === this.month && +caloriesInfo.year === this.year;
      });
    }));
    this.meals.sort((a, b) => +a.hours - +b.hours);
    this.isCurrentDay = this.day === this.currentDay.getDate() &&
      this.month === this.currentDay.getMonth() &&
      this.year === this.currentDay.getFullYear();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onCancel(): void {
    this.router.navigate(['/calendar']);
  }

  public onMeal(key: string): void {
    this.router.navigate(['/meal'], {queryParams: {'key': key}});
  }
}
