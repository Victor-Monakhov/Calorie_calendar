import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";
import { NewMealComponent } from './components/new-meal/new-meal.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CalendarComponent,
    NewMealComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
  ],
})
export class CalendarModule { }
