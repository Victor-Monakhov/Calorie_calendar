import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {CommonModule} from "@angular/common";
import {NewMealComponent} from "./components/new-meal/new-meal.component";

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
  {
    path: 'meal',
    component: NewMealComponent,
  }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
