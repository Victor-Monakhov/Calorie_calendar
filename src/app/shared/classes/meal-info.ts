import {Helper} from "./helper";
import {CaloriesInfo} from "./calories-info";

export interface MealsPerDay {
  caloriesInfo: CaloriesInfo;
  keys: string[];
}

export class MealInfo {
  public key: string;
  public date: Date = new Date();
  public time: string = '00:00';
  public name: string = 'My new meal';
  public kcal: number = 0;
  public fats: number = 0;
  public proteins: number = 0;
  public carbohydrates: number = 0;

  constructor(key: string) {
    this.key = key;
    let info = key.split('|');
    this.date = new Date(+info[2], +info[1], +info[0], +info[3], +info[4], 0);
    this.time = info[3] + ':' + info[4];
  }
}
