import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MealInfo} from "../../../../shared/classes/meal-info";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {mealsSelector} from "../../../../store/reducers/calendar";
import {SubSink} from "subsink";

@Component({
  selector: 'app-meal-info-view',
  templateUrl: './meal-info-view.component.html',
  styleUrls: ['./meal-info-view.component.scss']
})
export class MealInfoViewComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public meal: MealInfo = {} as MealInfo;
  public meals$: Observable<MealInfo[]> = this.store.select(mealsSelector);

  constructor(private store: Store, private router: Router, private aRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const key: string = this.aRoute.snapshot.queryParams['key'];
    if (!key) {
      this.router.navigate(['/']);
      return;
    }
    let meal: MealInfo | undefined;
    this.subs.add(
      this.meals$.subscribe(meals => {
        meal = meals.find(item => item.key === key);
      })
    );

    if (!meal) {
      this.router.navigate(['/']);
      return;
    }
    this.meal = meal;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onCancel(): void {
    this.router.navigate(['/calendar']);
  }

  public onEditMeal(): void {
    this.router.navigate(['meal'],
      {queryParams: {key: this.meal.key, mode: 'edit'}});
  }
}
