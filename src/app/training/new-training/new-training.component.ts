import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private availableExercisesSubscription: Subscription;

  newTrainingForm: FormGroup;
  availableExercises: Exercise[];

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.subscribeToAvailableExercisesChanged();
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.availableExercisesSubscription.unsubscribe();
  }

  startTraining() {
    this.trainingService.startExercise(
      this.newTrainingForm.value.selectedExerciseId
    );
  }

  private subscribeToAvailableExercisesChanged(): void {
    this.availableExercisesSubscription = this.trainingService.availableExercisesChanged$.subscribe(
      exercises => (this.availableExercises = exercises)
    );
  }

  private createForm() {
    this.newTrainingForm = this.fb.group({
      selectedExerciseId: ['', [Validators.required]]
    });
  }
}
