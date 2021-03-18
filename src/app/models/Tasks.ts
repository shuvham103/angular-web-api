export class Tasks{
  QuoteID:number|string;
  QuoteType:string;
  ContactPerson?:string;
  Task:string;
  DueDate:Date|string;
  TaskType:string;
  Open:Boolean|string;
  Description:string|null
  constructor(QuoteID:number|string,task:string,ContactPerson:string, DueDate:string,QuoteType:string,TaskType:string,Open:string|boolean, Description:string|null){
    this.QuoteID=QuoteID;
    this.Task=task;
    this.ContactPerson=ContactPerson;
    this.DueDate=DueDate;
    this.QuoteType=QuoteType;
    this.TaskType=TaskType;
    this.Open=Open;
    this.Description=Description;
  }
  
}

export class Task{
  Quote:Tasks
  constructor(task:Tasks){
    this.Quote=task;
  }
}