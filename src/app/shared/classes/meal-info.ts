export class MealInfo {
  public key: string;
  public day: number;
  public month: number;
  public year: number;
  public hours: string;
  public name: string = 'My new meal';
  public kcal: number = 0;
  public minutes: string = '00';
  public time: string = '00:00';
  public fats: number = 0;
  public proteins: number = 0;
  public carbohydrates: number = 0;
  constructor(info: string){
    this.key = info;
    let infoData = info.split('|');
    this.day = +infoData[0];
    this.month = +infoData[1];
    this.year = +infoData[2];
    this.hours = infoData[3];
    this.time = this.hours + ':' + this.minutes;
  }
}
