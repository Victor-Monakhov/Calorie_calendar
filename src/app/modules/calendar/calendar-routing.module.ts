import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
