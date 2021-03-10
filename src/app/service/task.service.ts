import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../models/Tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks():Tasks[]{
    return([{"QuoteId":"1","Task":"Tofly"},{"QuoteId":"2","Task":"To jump"},{"QuoteId":"3","Task":"Tofly"},{"QuoteId":"4","Task":"To jump"},{"QuoteId":"5","Task":"Tofly"},{"QuoteId":"6","Task":"To jump"},{"QuoteId":"7","Task":"Tofly"},{"QuoteId":"8","Task":"To jump"}]);
  }


  getTaskById():Tasks{
    return({"QuoteId":"1","QuoteType":"gghf","ContactPerson":"Manager","Task":"Dance","DueDate": "2020-02-21" ,"TaskType":"V.V imp"});
  }

  getTaskError():Tasks{
    return({"Message":"Something went wrong"});
  }
}
