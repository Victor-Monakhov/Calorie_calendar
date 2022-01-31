import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './components/calendar/calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";
import {NewMealComponent} from './components/new-meal/new-meal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SettingsComponent} from './components/settings/settings.component';
import {MealPipe} from "../../shared/pipes/meal.pipe";
import {MealInfoViewComponent} from './components/meal-info-view/meal-info-view.component';
import {DayOverviewComponent} from './components/day-overview/day-overview.component';

@NgModule({
  declarations: [
    CalendarComponent,
    NewMealComponent,
    SettingsComponent,
    MealPipe,
    MealInfoViewComponent,
    DayOverviewComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MealPipe
  ],
})
export class CalendarModule {
}
