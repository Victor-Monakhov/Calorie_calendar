import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {ShortMealInfo} from "../models/short-meal-info";
import {StorageService} from "../services/storage.service";
import {MealInfo} from "../classes/meal-info";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {mealsSelector} from "../../store/reducers/calendar";
import {SubSink} from "subsink";

@Pipe({
  name: 'meal'
})
export class MealPipe implements PipeTransform, OnDestroy {

  private subs: SubSink = new SubSink();
  private meals?: MealInfo[];
  private meals$: Observable<MealInfo[]> = this.store.select(mealsSelector);

  constructor(public store: Store) {
    this.subs.add( this.meals$.subscribe(meals => this.meals = meals));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  transform(key: string): ShortMealInfo | null {
    const meal = this.meals?.find(item => item.key === key);
    if (meal) {
      const hours = meal.time.split(':')[0];
      if (+hours < 12) {
        return {
          type: 'Breakfast',
          name: meal.name,
          kcal: meal.kcal
        } as ShortMealInfo;
      }
      if (+hours >= 12 && +hours <= 17) {
        return {
          type: 'Lunch',
          name: meal.name,
          kcal: meal.kcal
        } as ShortMealInfo;
      }
      if (+hours > 17) {
        return {
          type: 'Dinner',
          name: meal.name,
          kcal: meal.kcal
        } as ShortMealInfo;
      }
    }
    return null;
  }
}
