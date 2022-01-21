import {Component, OnInit} from '@angular/core';
import {CalendarService, MealInfo} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {
  public meal: MealInfo;

  constructor(public calendarService: CalendarService, public router: Router) {
    if(!calendarService.meal){
      alert("You haven't any meal! :(");
      this.router.navigate(['/']);
      this.meal = new MealInfo('');
    } else {
      this.meal = calendarService.meal;
    }

  }

  ngOnInit(): void {
  }

  public onCancel(){
    this.calendarService.removeTempMeal();
    this.router.navigate(['/']);
  }

}
