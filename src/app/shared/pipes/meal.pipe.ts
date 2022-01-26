import { Pipe, PipeTransform } from '@angular/core';
import {CalendarService} from "../services/calendar.service";
import {ShortMealInfo} from "../models/short-meal-info";

@Pipe({
  name: 'meal'
})
export class MealPipe implements PipeTransform {

  constructor(public calendarService: CalendarService) {
  }
  transform(key: string): ShortMealInfo | null {
    const meal = this.calendarService.meals$.value.find(item => item.key === key);
    if(meal){
      if(+meal.hours < 12){
        return {
          type: 'Breakfast',
          name: meal.name,
          kcal: meal.kcal
        } as ShortMealInfo;
      }
      if(+meal.hours >= 12 && +meal.hours <= 17){
        return {
          type: 'Dinner',
          name: meal.name,
          kcal: meal.kcal
        } as ShortMealInfo;
      }
      if(+meal.hours > 17){
        return {
          type: 'Supper',
          name: meal.name,
          kcal: meal.kcal
        } as ShortMealInfo;
      }
    }
    return null;
  }
}
