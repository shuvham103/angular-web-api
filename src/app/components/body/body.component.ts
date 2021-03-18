import { AfterViewInit,ViewChild,Component, OnInit } from '@angular/core';
import {TaskService} from '../../service/task.service';
import { TaskList } from 'src/app/models/TaskList';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialoguesComponent } from '../pages/dialogues/dialogues.component';
import { Router } from '@angular/router';
import { ViewComponent } from '../pages/view/view.component';
import { AddComponent } from '../pages/add/add.component';
import { retry } from 'rxjs/operators';
import { MatSort, MatSortable, Sort, SortDirection } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})

export class BodyComponent implements OnInit, AfterViewInit
{

  totalData!:number;
  @ViewChild(MatSort) sort!:MatSort;
  tasks!:TaskList[];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['QuoteType','QuoteID','ContactPerson', 'Task','DueDate','TaskType','action'];
  dataSource!:MatTableDataSource<TaskList>;
  constructor(private taskService:TaskService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  direction:SortDirection="asc"

  change(){
    if (this.direction=="asc"){
      this.direction="desc"
    }
    else{
      this.direction="asc"
    }
    this.sorts()
  }

  column:string=this.displayedColumns[0];
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;


  reload(){
    this.dataSource.paginator?._changePageSize(this.pageSize)
    this.dataSource.paginator = this.paginator;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  sorts(){
    let sortState: Sort = {active: this.column, direction: this.direction};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  len(task:TaskList[]){
    return task.length.toString();
  }

  ngAfterViewInit(){
    this.ngOnInit()
  }
  ngOnInit() 
  {
    this.taskService.getTasks().pipe(
      retry(5),
    ).subscribe(
      (suc)=>
      {
        this.tasks=suc; 
        this.totalData=suc.length;
        this.dataSource = new MatTableDataSource<TaskList>(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
    (err)=>
    {
      console.log(err);
      this.ngAfterViewInit();
    },
    ()=>
    {
      console.log("finished")
    }
    );
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(element:TaskList) 
  {
    const dialogRef = this.dialog.open(DialoguesComponent);
  
    dialogRef.afterClosed().pipe(
      retry(5)
    ).subscribe(result => 
      {
        if (result===true)
        {this.Delete(element);}
      });
  }
    
  Delete(task:TaskList)
  {
    this.taskService.DeleteTask(task.QuoteID.toString()).subscribe(
        (suc)=>
        {
          this.tasks=this.tasks.filter(t=>t.QuoteID!=task.QuoteID);
          this.dataSource = new MatTableDataSource<TaskList>(this.tasks);
          this.dataSource.paginator = this.paginator;
          this._snackBar.open(suc, "ok", {
            duration: 2000,
          });
        },
        (err)=>
        {
          console.log(err);
        }
      )
  }

  View(task:TaskList){
    const dialogRef = this.dialog.open(ViewComponent,{
      data:task,
      width:"600px"
    });
  }

  Edit(task:TaskList){
    const dialogRef= this.dialog.open(AddComponent,{
      data:task.QuoteID,
      width:"80%",
      height:"90%"
    });

    dialogRef.afterClosed().subscribe(result => 
      {
        
       if(result=="edit")
          {this.ngOnInit();
            this._snackBar.open("data changed", "ok", {
              duration: 2000,
            });
          }
        else if(result=="Delete")
        {this.openDialog(task)}
      });
  }

  Add(){
    const dialogRef = this.dialog.open(AddComponent,
      {
        data:undefined,
        width:"800px"
      }
      )
      dialogRef.afterClosed().subscribe(result => 
        {
          if(result=="edit")
            {
              this.ngOnInit();
              this._snackBar.open("data Addeed", "ok", {
                duration: 2000,
              });
            }
        }

      );
  }

}


