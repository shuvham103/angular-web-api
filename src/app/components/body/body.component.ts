import { AfterViewInit,ViewChild,Component, OnInit } from '@angular/core';
import {TaskService} from '../../service/task.service';
import { TaskList } from 'src/app/models/TaskList';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialoguesComponent } from '../pages/dialogues/dialogues.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit 
{
  
  tasks!:TaskList[];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['QuoteType','QuoteID','ContactPerson', 'Task','DueDate','TaskType','action'];
  dataSource!:MatTableDataSource<TaskList>;
  constructor(private taskService:TaskService,public dialog: MatDialog, private route:Router) { }

  ngOnInit() 
  {
    this.taskService.getTasks().subscribe(
      (suc)=>
      {
        this.tasks=suc; 
        this.dataSource = new MatTableDataSource<TaskList>(this.tasks);
        this.dataSource.paginator = this.paginator;
      },
    (err)=>
    {

      console.log(err);
      this.route.navigate(['login']);
    },
    ()=>
    {
      console.log("finished")
    }
    );
  }



  openDialog(element:TaskList) 
  {
    const dialogRef = this.dialog.open(DialoguesComponent);
  
    dialogRef.afterClosed().subscribe(result => 
      {
        if (result===true)
        {this.Delete(element);}
      });
  }
    
  Delete(task:TaskList)
  {
    console.log(task);
      
    this.taskService.DeleteTask(task.QuoteID.toString()).subscribe(
        (suc)=>
        {
          console.log(suc);
          this.tasks=this.tasks.filter(t=>t.QuoteID!=task.QuoteID);
          this.dataSource = new MatTableDataSource<TaskList>(this.tasks);
          this.dataSource.paginator = this.paginator;
        },
        (err)=>
        {
          console.log(err);
        }
      )
  }


}

