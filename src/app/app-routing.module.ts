import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./modules/calendar/components/start/start.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {StartPageGuard} from "./shared/guards/start-page.guard";

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    canActivate: [StartPageGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
