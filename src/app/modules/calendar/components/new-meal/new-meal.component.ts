import {Component, OnInit} from '@angular/core';
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
  public mode: string = '';
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9 ]*')]],
    kcal: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    time: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('(0[6-9]|1[0-9]|2[0-1]):[0-5][0-9]')]],
    fats: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]*')]],
    proteins: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]*')]],
    carbohydrates: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]*')]]
  });

  constructor(public aRoute: ActivatedRoute, private fb: FormBuilder, public calendarService: CalendarService, public router: Router) {
  }

  ngOnInit(): void {
    const key: string = this.aRoute.snapshot.queryParams['key'];
    this.mode = this.aRoute.snapshot.queryParams['mode'];
    if (!key) {
      this.router.navigate(['/calendar']);
      return;
    }

    const meal: MealInfo | undefined = this.calendarService.getMealByKey(key);
    if (meal && !this.mode) {
      this.router.navigate(['/meal-info-view'], {queryParams: {'key': key}});
    } else if (meal && this.mode === 'edit') {
      this.meal = meal;
      this.form.setValue({
        name: this.meal.name,
        kcal: this.meal.kcal,
        time: this.meal.time,
        fats: this.meal.fats,
        proteins: this.meal.proteins,
        carbohydrates: this.meal.carbohydrates
      });
    } else {
      this.meal = new MealInfo(key);
      this.form.patchValue({'time': this.meal.time})
    }
  }

  public onCancel() {
    this.router.navigate(['/calendar']);
  }

  public onAddMeal() {
    this.calendarService.updateMeals(this.meal, this.form);
    this.onCancel();
  }
}
