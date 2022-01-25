import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    male: [0],
    female: [0],
    age: [0],
    weight: [0, [Validators.min(20), Validators.max(400), Validators.pattern('[0-9]*')]],
    height: [0, [Validators.min(60), Validators.max(250), Validators.pattern('[0-9]*')]],
    minKcal: [0, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]],
    maxKcal: [0, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]],
    fats: [0, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]],
    proteins: [0, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]],
    carbohydrates: [0, [Validators.min(100), Validators.max(7000), Validators.pattern('[0-9]*')]]
  });
  public radioValue: string = '';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.setValue({
      male: [0],
      female: [0],
      age: [0],
      weight: [0],
      height: [0],
      minKcal: [0],
      maxKcal: [0],
      fats: [0],
      proteins: [0],
      carbohydrates: [0]
    });
  }

  public onCancel(){

  }

  public onSave(){

  }

  public onGender(gender: string){
    this.radioValue = gender;
  }

}
