export class Tasks{
  QuoteID:number|string;
  QuoteType?:string;
  ContactPerson?:string;
  Task?:string;
  DueDate:Date|string;
  TaskType?:string;
  Open?:Boolean|string;
  constructor(DueDate:Date|string,QuoteID:number|string){
    this.QuoteID=QuoteID;
    this.DueDate=DueDate;
  }
  
}

export class Task{
  Quote:Tasks
  constructor(task:Tasks){
    this.Quote=task;
  }
}