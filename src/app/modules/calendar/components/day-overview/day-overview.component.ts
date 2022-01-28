import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../../../../shared/services/calendar.service";
import {MealInfo} from "../../../../shared/classes/meal-info";
import {UserSettings} from "../../../../shared/classes/user-settings";
import {TotalCalories} from "../../../../shared/classes/total-calories";

@Component({
  selector: 'app-day-overview',
  templateUrl: './day-overview.component.html',
  styleUrls: ['./day-overview.component.scss']
})
export class DayOverviewComponent implements OnInit {

  public meals: MealInfo[] = [];
  public months: string[];
  public isCurrentDay: boolean = false;
  public currentDay: Date;
  public day: number = 0;
  public month: number = 0;
  public year: number = 0;
  public userSettings: UserSettings;
  public totalCalories?: TotalCalories;

  constructor(private router: Router, private aRoute: ActivatedRoute, private calendarService: CalendarService) {
    this.months = this.calendarService.months;
    this.currentDay = this.calendarService.currentDay;
    this.userSettings = this.calendarService.userSettings;
  }

  ngOnInit(): void {
    this.day = +this.aRoute.snapshot.queryParams['day'];
    this.month = +this.aRoute.snapshot.queryParams['month'];
    this.year = +this.aRoute.snapshot.queryParams['year'];
    this.meals = this.calendarService.getMealsPerDey(this.day, this.month, this.year);
    this.meals.sort((a, b) => +a.hours - +b.hours);
    this.isCurrentDay = this.day === this.currentDay.getDate() &&
      this.month === this.currentDay.getMonth() &&
      this.year === this.currentDay.getFullYear();
    this.totalCalories = this.calendarService.getTotalCalories(this.day, this.month, this.year);
  }

  public onCancel(){
    this.router.navigate(['/calendar']);
  }

  public onMeal(key: string){
    this.router.navigate(['/meal'], {queryParams: {'key': key}});
  }

}
