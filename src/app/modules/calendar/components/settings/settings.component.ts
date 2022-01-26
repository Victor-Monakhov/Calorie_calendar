import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CalendarService} from "../../../../shared/services/calendar.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

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
  //public radioValue: string = 'male';

  constructor(private fb: FormBuilder, private router: Router, private calenderService: CalendarService) {}

  ngOnInit(): void {
    this.form.setValue({
      gender: this.calenderService.userSettings.gender,
      age: this.calenderService.userSettings.age,
      weight: this.calenderService.userSettings.weight,
      height: this.calenderService.userSettings.height,
      minKcal: this.calenderService.userSettings.minKcal,
      maxKcal: this.calenderService.userSettings.maxKcal,
      fats: this.calenderService.userSettings.fats,
      proteins: this.calenderService.userSettings.proteins,
      carbohydrates: this.calenderService.userSettings.carbohydrates
      });
   //this.radioValue = this.calenderService.userSettings.gender;
  }

  public onCancel(){
    this.router.navigate(['/']);
  }

  public onSave(){

  }

  public onCalculate(){
    const minKcal: number = Math.floor((10 * this.form.value.weight) +
      (6.25 * this.form.value.height) -
      (5 * this.form.value.age) +
      ((this.form.value.gender === 'male') ?  5 : -161));
    const maxKcal: number = Math.floor(minKcal * 1.55);
    const averageKcal: number = Math.floor((minKcal + maxKcal)/2);
    const fats: number = Math.floor(0.3*averageKcal/9);
    const proteins: number = Math.floor(0.3*averageKcal/4);
    const carbohydrates: number = Math.floor(0.3*averageKcal/4);
    this.form.patchValue({'minKcal': minKcal});
    this.form.patchValue({'maxKcal': maxKcal});
    this.form.patchValue({'fats': fats});
    this.form.patchValue({'proteins': proteins});
    this.form.patchValue({'carbohydrates': carbohydrates});
  }
}
