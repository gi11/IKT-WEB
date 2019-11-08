import { Component, OnInit, Input} from '@angular/core';

import { Exercise } from "../exercise";

@Component({
  selector: 'fitapp-exercise-list',
  templateUrl: './exercise-list.component.html',
  styles: []
})
export class ExerciseListComponent implements OnInit {

  @Input() exercises: Exercise[] = [];
  
  displayedColumns: string[] = ['name', 'description', 'set', 'repeat'];

  constructor() { }

  ngOnInit() {
  }

  editExercise(id: string){

  }

  deleteExercise(){

  }

}
