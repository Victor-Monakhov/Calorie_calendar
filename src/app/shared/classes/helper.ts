import {MealInfo} from "./meal-info";

export class Helper {
  public static getWeekDay(date: Date): number {
    let day: number = date.getDay() - 1;
    if (day === -1) {
      day = 6;
    }
    return day;
  }

  public static createKey(date: Date, time: string): string {
    return `${date.getDate()}|${date.getMonth()}|${date.getFullYear()}|${time.split(':')[0]}`
  }

  public static updateKey(meal: MealInfo): void {
    meal.hours = meal.time.split(':')[0];
    meal.minutes = meal.time.split(':')[1];
    let keyArr = meal.key.split('|');
    keyArr[3] = meal.hours;
    meal.key = keyArr.join('|');
  }

  public static keysInitEmpty(weekLength: number, timesLength: number): string[]{
    const keys: string[] = [];
    for (let i = 0; i < weekLength * timesLength; ++i) {
      keys.push('');
    }
    return keys;
  }
}
