import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MealInfo} from "../../../../shared/classes/meal-info";
import {CalendarService} from "../../../../shared/services/calendar.service";

@Component({
  selector: 'app-meal-info-view',
  templateUrl: './meal-info-view.component.html',
  styleUrls: ['./meal-info-view.component.scss']
})
export class MealInfoViewComponent implements OnInit {

  public meal: MealInfo = {} as MealInfo;

  constructor(private router: Router, private aRoute: ActivatedRoute, private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    const key: string = this.aRoute.snapshot.queryParams['key'];
    if (!key) {
      this.router.navigate(['/']);
      return;
    }
    const meal: MealInfo | undefined = this.calendarService.getMealByKey(key);
    if (!meal) {
      this.router.navigate(['/']);
      return;
    }
    this.meal = meal;
  }

  public onCancel() {
    this.router.navigate(['/calendar']);
  }

  public onEditMeal() {
    this.router.navigate(['meal'],
      {queryParams: {key: this.meal.key, mode: 'edit'}});
  }
}
