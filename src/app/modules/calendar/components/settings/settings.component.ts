import {
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";
import {Store} from "@ngrx/store";
import {settingsSelector, updateSettingsInput} from "../../../../store/reducers/calendar";
import {SubSink} from "subsink";
import {Observable} from "rxjs";
import {Settings} from "../../../../shared/classes/settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public userSettings$: Observable<Settings> = this.store.select(settingsSelector);

  public form: FormGroup = this.fb.group({
    gender: ['male'],
    age: [25, [Validators.min(5), Validators.max(100), Validators.pattern('[0-9]*')]],
    weight: [55, [Validators.min(20), Validators.max(400), Validators.pattern('[0-9]*')]],
    height: [170, [Validators.min(60), Validators.max(250), Validators.pattern('[0-9]*')]],
    minKcal: [1492, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]],
    maxKcal: [2312, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]],
    fats: [63, [Validators.min(10), Validators.max(1000), Validators.pattern('[0-9]*')]],
    proteins: [142, [Validators.min(10), Validators.max(1000), Validators.pattern('[0-9]*')]],
    carbohydrates: [142, [Validators.min(10), Validators.max(1000), Validators.pattern('[0-9]*')]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.subs.add(this.userSettings$.subscribe(settings => {
      this.form.setValue({
        gender: settings.gender,
        age: settings.age,
        weight: settings.weight,
        height: settings.height,
        minKcal: settings.minKcal,
        maxKcal: settings.maxKcal,
        fats: settings.fats,
        proteins: settings.proteins,
        carbohydrates: settings.carbohydrates
      });
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onCancel(): void {
    this.router.navigate(['/calendar']);
  }

  public onSave(): void {
    this.store.dispatch(updateSettingsInput({form: this.form.value}));
    this.router.navigate(['/calendar']);
  }

  public onExit(): void {
    this.authService.signOut(()=>this.router.navigate(['/']));
  }

  public onCalculate(): void {
    const minKcal: number = Math.floor((10 * this.form.value.weight) +
      (6.25 * this.form.value.height) -
      (5 * this.form.value.age) +
      ((this.form.value.gender === 'male') ? 5 : -161));
    const maxKcal: number = Math.floor(minKcal * 1.55);
    const averageKcal: number = Math.floor((minKcal + maxKcal) / 2);
    const fats: number = Math.floor(0.3 * averageKcal / 9);
    const proteins: number = Math.floor(0.3 * averageKcal / 4);
    const carbohydrates: number = Math.floor(0.3 * averageKcal / 4);
    this.form.patchValue({'minKcal': minKcal});
    this.form.patchValue({'maxKcal': maxKcal});
    this.form.patchValue({'fats': fats});
    this.form.patchValue({'proteins': proteins});
    this.form.patchValue({'carbohydrates': carbohydrates});
  }
}
