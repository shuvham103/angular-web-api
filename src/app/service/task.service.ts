import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Errors } from '../models/Errors';
import { TaskList } from '../models/TaskList';
import { Task, Tasks } from '../models/Tasks';
import { catchError , map } from 'rxjs/operators';
import { Router } from '@angular/router';

var httpOptions={
  headers:new HttpHeaders({
    'Authorization':'Bearer '+window.localStorage.getItem("TaskMgmt")
  })
}

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
    this.SetToken();
    return this.http.get<TaskList[]>(this.tasksUrl,httpOptions);
 }


  getTaskById(idss?:string|number|undefined):Observable<Task>
  {
    this.SetToken();
    if(idss===undefined)
    {
      return of(this.task);
    }
    else
    {
      let abc= this.http.get<Task>(this.tasksUrl+idss.toString(),httpOptions);
      return abc;
      
    }
  }

  addTask(tasks:Tasks)
  {
    this.SetToken();
    return this.http.put<string>(this.addUrl ,tasks,httpOptions)
  }


  editTask(task:Tasks,id:string)
  {
    this.SetToken();
    return this.http.post<string>(this.editUrl+id ,task,httpOptions)
  }

  DeleteTask(id:string){
    this.SetToken();
    return this.http.delete<string>(this.deleteUrl+id ,httpOptions)
  }

  getTaskError():Errors{
    this.SetToken();
    return({"Message":"Something went wrong"});
  }

  SetToken(){
    let token=window.localStorage.getItem("TaskMgmt");
    httpOptions.headers.set("Authorization","Bearer "+token);
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

