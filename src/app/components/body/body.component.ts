import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../service/task.service';
import {Tasks} from '../../models/Tasks';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  tasks!:Tasks[];
  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.tasks=this.taskService.getTasks()
    }


}
