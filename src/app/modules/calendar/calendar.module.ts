import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import * as Hammer from "hammerjs";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


// export class MyHammerConfig extends HammerGestureConfig {
//   override overrides = <any> {
//     swipe: {direction: Hammer.DIRECTION_ALL },
//   };
// }

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
  ],
  // providers: [
  //   {
  //     provide: HAMMER_GESTURE_CONFIG,
  //     useClass: MyHammerConfig,
  //   },
  // ],
})
export class CalendarModule { }
