export class TaskList{
    QuoteID:number|string;
    Task:string;
    ContactPerson:string;
    DueDate:string;
    QuoteType:string
    TaskType:string
    Open:string|boolean
    constructor(QuoteID:number|string,task:string,ContactPerson:string, DueDate:string,QuoteType:string,TaskType:string,Open:string|boolean){
        this.QuoteID=QuoteID;
        this.Task=task;
        this.ContactPerson=ContactPerson;
        this.DueDate=DueDate;
        this.QuoteType=QuoteType;
        this.TaskType=TaskType;
        this.Open=Open;
    }
}