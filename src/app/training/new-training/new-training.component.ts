import { UIService } from 'src/app/shared/ui.service';
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
  private loadingSubs: Subscription;

  newTrainingForm: FormGroup;
  availableExercises: Exercise[];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.subscribeToAvailableExercisesChanged();
    this.fetchExercises();
  }

  ngOnDestroy() {
    this.availableExercisesSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
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
