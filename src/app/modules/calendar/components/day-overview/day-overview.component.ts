import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MealInfo} from "../../../../shared/classes/meal-info";
import {Settings} from "../../../../shared/classes/settings";
import {CaloriesInfo} from "../../../../shared/classes/calories-info";
import {combineLatest, map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  mealsSelector,
  settingsSelector
} from "../../../../store/reducers/calendar";
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
  public date?: Date;
  public caloriesInfo?: CaloriesInfo;
  public meals$: Observable<MealInfo[]> = this.store.select(mealsSelector);
  public settings$: Observable<Settings> = this.store.select(settingsSelector);

  constructor(private store: Store,
              private router: Router,
              private aRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.date = Helper.getDateFromKey(this.aRoute.snapshot.queryParams['key']);
    if(this.date) {
      this.subs.add(combineLatest([this.meals$, this.settings$])
        .subscribe(([meals, settings]) => {
          this.meals = meals.filter(meal => {
            return meal.date.getDate() === this.date?.getDate() &&
              meal.date.getMonth() === this.date?.getMonth() &&
              meal.date.getFullYear() === this.date?.getFullYear()
          });
          this.caloriesInfo = Helper.getCaloriesInfo(this.date as Date, this.meals, settings);
          this.meals.sort((a, b) => {
            return +a.time.split(':')[0] - +b.time.split(':')[0];
          });
          this.isCurrentDay = this.date?.getDate() === this.currentDay.getDate() &&
            this.date?.getMonth() === this.currentDay.getMonth() &&
            this.date?.getFullYear() === this.currentDay.getFullYear();
        }));
    } else {
      this.onCancel();
    }
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
