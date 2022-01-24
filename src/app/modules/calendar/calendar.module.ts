import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";
import { NewMealComponent } from './components/new-meal/new-meal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    CalendarComponent,
    NewMealComponent,
    SettingsComponent
  ],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class CalendarModule { }
