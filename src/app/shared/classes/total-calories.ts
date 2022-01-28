export class TotalCalories{
  public amount: number = 0;
  public fats: number = 0;
  public proteins: number = 0;
  public carbohydrates: number = 0;
  public status: string = 'blue';
  public fatsStatus: string = 'blue';
  public proteinsStatus: string = 'blue';
  public carbohydratesStatus: string = 'blue';
  public day: string = '0';
  public month: string = '0';
  public year: string = '0';

  constructor() {}


  public getStatus(min: number, max: number, total: number): string{
    if(min <= total && max >= total){
      return 'blue';
    } else if(min > total){
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
