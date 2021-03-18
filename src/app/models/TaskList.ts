export class TaskList{
    QuoteID:number|string;
    Task:string;
    ContactPerson:string;
    DueDate:Date;
    QuoteType:string
    TaskType:string
    Open:string|boolean
    Description:string|null;
    constructor(QuoteID:number|string,task:string,ContactPerson:string, DueDate:Date,QuoteType:string,TaskType:string,Open:string|boolean, Description:string|null){
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