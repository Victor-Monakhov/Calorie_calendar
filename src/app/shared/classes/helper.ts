import {MealInfo} from "./meal-info";

export class Helper {

  public static readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public static readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public static readonly times: string[] = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

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

  public static keysInitEmpty(): string[]{
    const keys: string[] = [];
    for (let i = 0; i < Helper.weekDays.length * Helper.times.length; ++i) {
      keys.push('');
    }
    return keys;
  }
}
