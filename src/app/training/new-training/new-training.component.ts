import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  availableExercises: Exercise[] = [];

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {
    this.createForm();
  }

  ngOnInit() {
    //this.availableExercises = this.trainingService.getAvailableExercises();
    this.db
      .collection('availableExercises')
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });
  }

  startTraining() {
    this.trainingService.startExercise(
      this.newTrainingForm.value.selectedExerciseId
    );
  }

  private createForm() {
    this.newTrainingForm = this.fb.group({
      selectedExerciseId: ['', [Validators.required]]
    });
  }
}
