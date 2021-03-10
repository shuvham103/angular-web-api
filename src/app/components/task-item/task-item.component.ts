import { Component, Input, OnInit } from '@angular/core';
import{Tasks} from "../../models/Tasks";
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Tasks;
  constructor() { }

  ngOnInit(): void {
  }

}
