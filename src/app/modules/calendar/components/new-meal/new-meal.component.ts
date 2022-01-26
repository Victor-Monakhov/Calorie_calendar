import {Component,OnInit} from '@angular/core';
import {CalendarService} from "../../../../shared/services/calendar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MealInfo} from "../../../../shared/classes/meal-info";

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {
  public meal: MealInfo = {} as MealInfo;
  public form: FormGroup =   this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9 ]*')]],
    kcal: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    time: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('(0[6-9]|1[0-9]|2[0-1]):[0-5][0-9]')]],
    fats: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    proteins: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    carbohydrates: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern('[0-9]*')]]
  });

  constructor(public aRoute: ActivatedRoute, private fb: FormBuilder, public calendarService: CalendarService, public router: Router) {}

  ngOnInit(): void {
    const key = this.aRoute.snapshot.queryParams['key'];
    if(!key){
      this.router.navigate(['/']);
    } else {
      this.meal = this.calendarService.getMealByKey(key) ?? new MealInfo(key);
      this.form.setValue({
        name: this.meal.name,
        kcal: this.meal.kcal,
        time: this.meal.time,
        fats: this.meal.fats,
        proteins: this.meal.proteins,
        carbohydrates: this.meal.carbohydrates
      });
    }
  }

  public onCancel(){
    this.router.navigate(['/']);
  }

  public onAddMeal(){
    this.calendarService.updateMeals(this.meal, this.form);
    this.onCancel();
  }
}
