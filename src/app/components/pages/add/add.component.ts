import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/service/task.service';
import {FormsModule} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialoguesComponent } from '../dialogues/dialogues.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  tasks!:Tasks;
  id?:number|string;
  buttonQuote:string="Add";
  dates:Date|string|null=null;
  hidden:boolean=false;
  constructor(private taskService:TaskService,private route:ActivatedRoute,private router: Router, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.route.params.subscribe( params => this.id=params["id"]);
    if (this.id===undefined){
      this.buttonQuote="Add"
      this.hidden=false;
    }
    else{
      this.buttonQuote="Edit"
      this.hidden=true;
    }

    this.taskService.getTaskById(this.id).
    subscribe(
    (suc)=>
      {
        
        this.tasks=suc.Quote;
        this.dates=new Date(this.tasks.DueDate);
        console.log(this.dates)
        console.log(suc.Quote);
      },
    (err)=>
    {
      this.handleError(err);
    },
    ()=>
    {
      console.log("finished")
    })
    
  }

  addEdit(task:Tasks,act:string){
    if (act==="Edit"){
      console.log(task);
      this.taskService.editTask(task,task.QuoteID.toString()).subscribe(
        (suc)=>{
          console.log(suc);
          this.router.navigate(['']);
        },
        (err)=>{
          this.handleError(err);  
        }
      )
    }
    else{
      console.log(task);
      this.taskService.addTask(task).subscribe(
        (suc)=>{
          console.log(suc);
          this.router.navigate(['']);
          
        },
        (err)=>{
          this.handleError(err);
        }
      )
    }
  }

  openDialog(element:Tasks) {
    const dialogRef = this.dialog.open(DialoguesComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result===true){this.Delete(element.QuoteID.toString());}
    });
  }
  
  Delete(task:string|number){
    console.log("delete");
    task=task.toString();
    console.log(task);
    this.taskService.DeleteTask(task).subscribe(
      (suc)=>{
        console.log(suc);
        this.router.navigate(['']);
      },
      (err)=>{
        this.handleError(err);
      }
    )
  }



  handleError(err:HttpErrorResponse){
    if(err.status==401||err.status==403){
      console.log(err);
      this.router.navigate(['login']);
    }
    else{
      this.router.navigate(['bad']);
    }
  }
}
