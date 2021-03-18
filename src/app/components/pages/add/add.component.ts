import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/service/task.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  tasks!:Tasks;
  buttonQuote:string="Add";
  today = new Date();
  dates:Date|string=new Date()
  hidden:boolean=false;
  constructor(
    public dialogRefs:MatDialogRef<AddComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public id:string|undefined,
    private taskService:TaskService,
     
    public dialog: MatDialog
    ) { }
  

    descLength():number{
      if(this.tasks.Description==null){
        return 0;
      }
      else{
        return this.tasks.Description.length;
      }
    }
  ngOnInit(): void {
    if (this.id===undefined){
      this.buttonQuote="Add"
      this.hidden=false;
    }
    else{
      this.buttonQuote="Update"
      this.hidden=true;
    }

    this.taskService.getTaskById(this.id).
    subscribe(
    (suc)=>
      {
        this.tasks=suc.Quote;

        this.tasks.DueDate=new Date(this.tasks.DueDate);
        console.log(this.tasks.DueDate);
        
        console.log(suc.Quote);
      
      },
    (err)=>
    {
      this.taskService.handleError(err)
    },
    ()=>
    {
      console.log("finished")
    })
    
  }

  addEdit(task:Tasks,act:string){
    if (act==="Update"){
      console.log(task);
      debugger
      this.taskService.editTask(task,task.QuoteID.toString()).subscribe(
        (suc)=>{
          this.id=undefined;
          this.dialogRefs.close("edit");
        },
        (err)=>{
          this.taskService.handleError(err);  
        }
      )
    }
    else{
      this.taskService.addTask(task).subscribe(
        (suc)=>{
          console.log(suc);
          this.id=undefined;
          this.dialogRefs.close("edit");
          
        },
        (err)=>{
          this.taskService.handleError(err);
        }
      )
    }
  }

  openDialog() {
    this.dialogRefs.close("Delete");
  }
  


  Delete(task:string|number){
    task=task.toString();
    console.log(task);
    this.taskService.DeleteTask(task).subscribe(
      (suc)=>{
        console.log(suc);
        this.id=undefined;
        this.dialogRefs.close("edit");
      },
      (err)=>{
        this.taskService.handleError(err);
      }
    )
  }



  
}
