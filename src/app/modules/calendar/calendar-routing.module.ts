import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {CommonModule} from "@angular/common";
import {NewMealComponent} from "./components/new-meal/new-meal.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {MealInfoViewComponent} from "./components/meal-info-view/meal-info-view.component";
import {DayOverviewComponent} from "./components/day-overview/day-overview.component";
import {MealsResolver} from "../../shared/classes/meals.resolver";

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
    // resolve: {
    //   mealsPerWeek: MealsResolver
    // },
  },
  {
    path: 'meal',
    component: NewMealComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'meal-info-view',
    component: MealInfoViewComponent,
  },
  {
    path: 'day-overview',
    component: DayOverviewComponent,
  }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
