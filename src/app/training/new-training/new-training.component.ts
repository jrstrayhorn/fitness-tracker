import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  selectedExerciseId: string;
  availableExercises: Exercise[] = [];
  //@Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  startTraining() {
    this.trainingService.startExercise(this.selectedExerciseId);
    //this.trainingStart.emit();
  }
}
