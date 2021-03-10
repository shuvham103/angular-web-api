import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/Tasks';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  tasks!:Tasks;
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.tasks=this.taskService.getTaskById();
  }

}
