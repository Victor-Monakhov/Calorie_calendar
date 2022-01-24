import {Component, OnInit} from '@angular/core';
import {CalendarService, MealInfo} from "../../../../shared/services/calendar.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {
  public meal: MealInfo;
  public form: FormGroup = this.fb.group({
    title: ['New meal', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9 ]*')]],
    kcal: [0],
    time: ['06:00'],
    fats: [0],
    proteins: [0],
    carbohydrates: [0]
  });

  constructor(private fb: FormBuilder, public calendarService: CalendarService, public router: Router) {
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

  public onAddMeal(){
    this.meal.updateKey();
    this.calendarService.updateMeals(this.meal);
    this.onCancel();
  }

}
