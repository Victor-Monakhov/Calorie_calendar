import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
  ],
})
export class CalendarModule { }
