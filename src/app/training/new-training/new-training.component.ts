import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  availableExercises: Observable<Exercise[]>;

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.availableExercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return <Exercise>{
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      );

    //valueChanges doesn't give us the id
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
