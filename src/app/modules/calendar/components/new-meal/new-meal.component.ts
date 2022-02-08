import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MealInfo} from "../../../../shared/classes/meal-info";
import {Store} from "@ngrx/store";
import {SubSink} from "subsink";
import {Observable} from "rxjs";
import {mealsSelector, updateMealsInput} from "../../../../store/reducers/calendar";

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public meals$: Observable<MealInfo[]> = this.store.select(mealsSelector);
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

  constructor(private store: Store, public aRoute: ActivatedRoute, private fb: FormBuilder, public router: Router) {
  }

  ngOnInit(): void {
    const key: string = this.aRoute.snapshot.queryParams['key'];
    this.mode = this.aRoute.snapshot.queryParams['mode'];
    if (!key) {
      this.router.navigate(['/calendar']);
      return;
    }
    let meal: MealInfo | undefined;
    this.subs.add(
      this.meals$.subscribe(meals => {
        meal = meals.find(item => item.key === key);
      })
    );
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onCancel(): void {
    this.router.navigate(['/calendar']);
  }

  public onAddMeal(): void{
    this.store.dispatch(updateMealsInput({'meal': this.meal, 'form': this.form.value}));
    this.onCancel();
  }
}
