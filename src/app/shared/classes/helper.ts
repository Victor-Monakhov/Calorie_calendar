import {MealInfo, MealsPerDay} from "./meal-info";
import {CaloriesInfo} from "./calories-info";
import {Settings} from "./settings";

export class Helper {

  public static readonly weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public static readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public static readonly times: string[] = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

  public static getMondayDate(date: Date): Date {
    const tmpDate = new Date(date);
    let day: number = date.getDay() - 1;
    if (day === -1) {
      day = 6;
    }
    tmpDate.setDate(date.getDate() - day);
    return tmpDate;
  }

  public static createKey(date: Date, time: string): string {
    const timeArr = time.split(':');
    return `${date.getDate()}|${date.getMonth()}|${date.getFullYear()}|${timeArr[0]}|${timeArr[1]}`;
  }

  public static getKeys(date: Date): string[] {
    const keys = [];
    for (let i = 0; i < Helper.times.length; ++i) {
       keys[i] = Helper.createKey(date, Helper.times[i]);
    }
    return keys;
  }

  public static updateKey(meal: MealInfo): void {
    let keyArr = meal.key.split('|');
    keyArr[3] = meal.time.split(':')[0];
    keyArr[4] = meal.time.split(':')[1];
    meal.key = keyArr.join('|');
  }

  public static getDateFromKey(key: string){
    const info = key.split('|');
    return new Date(+info[2], +info[1], +info[0], +info[3], +info[4], 0);
  }

  public static keysInitEmpty(): string[]{
    const keys: string[] = [];
    for (let i = 0; i < Helper.weekDays.length * Helper.times.length; ++i) {
      keys.push('');
    }
    return keys;
  }

  public static updateMealsPerWeek(meals: MealInfo[], date: Date, settings: Settings): MealsPerDay[]{
    const mealsPerWeek: MealsPerDay[] = [];
    const dateClone = new Date(date);
    const day = dateClone.getDate();
    const month = dateClone.getMonth();
    const year = dateClone.getFullYear();
    this.weekDays.forEach((item, i) => {
      dateClone.setDate(1);
      dateClone.setMonth(month);
      dateClone.setFullYear(year);
      dateClone.setDate(day + i);
      this.setMealsPerDay(mealsPerWeek, settings, dateClone, i, meals);
    });
    return mealsPerWeek;
  }

  public static setMealsPerDay(mealsPerWeek: MealsPerDay[], settings: Settings, date: Date, weekDay: number, meals: MealInfo[]){
    mealsPerWeek.push({
      'caloriesInfo': Helper.getCaloriesInfo(date, meals, settings ?? new Settings()),
      'keys': Helper.getKeys(date),
    } as MealsPerDay);
  }

  public static getCaloriesInfo(date: Date, meals: MealInfo[], settings: Settings){
      const caloriesInfo = new CaloriesInfo();
      meals.forEach(item => {
        if (item.date.getDate() === date.getDate() &&
          item.date.getMonth() === date.getMonth() &&
          item.date.getFullYear() === date.getFullYear()) {
          caloriesInfo.kcal += +item.kcal;
          caloriesInfo.fats += +item.fats;
          caloriesInfo.proteins += +item.proteins;
          caloriesInfo.carbohydrates += +item.carbohydrates;
        }
      });
    caloriesInfo.date = new Date(date);
      caloriesInfo.status = caloriesInfo.getStatus(settings.minKcal, settings.maxKcal, caloriesInfo.kcal);
      caloriesInfo.fatsStatus = caloriesInfo.getStatus(settings.fats, settings.fats, caloriesInfo.fats);
      caloriesInfo.proteinsStatus = caloriesInfo.getStatus(settings.proteins, settings.proteins, caloriesInfo.proteins);
      caloriesInfo.carbohydratesStatus = caloriesInfo.getStatus(settings.carbohydrates, settings.carbohydrates, caloriesInfo.carbohydrates);
      return caloriesInfo;
  }
}
