import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Errors } from '../models/Errors';
import { TaskList } from '../models/TaskList';
import { Task, Tasks } from '../models/Tasks';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
task:Task={"Quote":{"QuoteID":"Will be assigned","QuoteType":"","ContactPerson":"","Task":"","DueDate": new Date() ,"TaskType":"", "Description":"", "Open":false}};
    
  tasksUrl:string ='https://localhost:44339/api/values/';
  addUrl:string='https://localhost:44339/add';
  editUrl:string='https://localhost:44339/update/';
  deleteUrl:string='https://localhost:44339/delete/';


  constructor(private http:HttpClient, private router: Router) { }

  getTasks():Observable<TaskList[]>{
    return this.http.get<TaskList[]>(this.tasksUrl,{headers:new HttpHeaders().set('Authorization','Bearer '+window.localStorage.getItem("TaskMgmt"))});
 }


  getTaskById(idss?:string|number|undefined):Observable<Task>
  {
    if(idss===undefined)
    {
      return of(this.task);
    }
    else
    {
      let abc= this.http.get<Task>(this.tasksUrl+idss.toString(),{headers:new HttpHeaders().set('Authorization','Bearer '+window.localStorage.getItem("TaskMgmt"))});
      return abc;
      
    }
  }

  addTask(tasks:Tasks)
  {
    return this.http.put<string>(this.addUrl ,tasks,{headers:new HttpHeaders().set('Authorization','Bearer '+window.localStorage.getItem("TaskMgmt"))})
  }


  editTask(task:Tasks,id:string)
  {
    return this.http.post<string>(this.editUrl+id ,task,{headers:new HttpHeaders().set('Authorization','Bearer '+window.localStorage.getItem("TaskMgmt"))})
  }

  DeleteTask(id:string){
    return this.http.delete<string>(this.deleteUrl+id ,{headers:new HttpHeaders().set('Authorization','Bearer '+window.localStorage.getItem("TaskMgmt"))})
  }

  getTaskError():Errors{
    return({"Message":"Something went wrong"});
  }

  isLoggedIn():boolean{
    if(window.localStorage.getItem("TaskMgmt")==null){
      return false;
    }
    return true;
  }

  handleError(err:any){
    if(err.status==401||err.status==403){
      console.log(err);
      this.router.navigate(['login']);
    }
    else{
      this.router.navigate(['bad']);
    }
  }

}

