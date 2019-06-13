import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable } from 'rxjs';
import { ExerciseListing } from './exercise-listing.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  /** stores currently running exercise in the app */
  private currentExercise: Exercise;
  private exerciseChanged = new Subject<Exercise>();
  private availableExercisesChanged = new Subject<Exercise[]>();
  private exerciseListing = new ExerciseListing();

  public readonly exerciseChanged$: Observable<
    Exercise
  > = this.exerciseChanged.asObservable();
  public readonly availableExercisesChanged$: Observable<
    Exercise[]
  > = this.availableExercisesChanged.asObservable();

  constructor(private db: AngularFirestore) {}

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice(); // will create new copy of the array; allow to edit array in other areas without changing original
  }

  fetchAvailableExercises(): void {
    this.db
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
      )
      .subscribe(exercises => {
        this.availableExercises = exercises;
        this.availableExercisesChanged.next([...this.availableExercises]);
      });

    //valueChanges doesn't give us the id
  }

  getCurrentExerciseDuration(): number {
    return this.getCurrentExercise().duration;
  }

  getPastExercises(): Exercise[] {
    return this.exerciseListing.getExercises();
  }

  startExercise(selectedId: string): void {
    this.setCurrentExercise(selectedId);
    this.emitCurrentExercise();
  }

  completeExercise() {
    this.completeCurrentExercise();
    this.addCurrentExerciseToListing();
    this.resetCurrentExerciseState();
  }

  cancelExercise(progress: number) {
    this.cancelCurrentExercise(progress);
    this.addCurrentExerciseToListing();
    this.resetCurrentExerciseState();
  }

  private getCurrentExercise(): Exercise {
    return { ...this.currentExercise };
  }

  private resetCurrentExerciseState(): void {
    this.clearCurrentExercise();
    this.emitClearedExercise();
  }

  private addCurrentExerciseToListing() {
    this.exerciseListing.addExercise(this.currentExercise);
  }

  private cancelCurrentExercise(progress: number): void {
    this.currentExercise.duration = this.calculatePercentageProgress(
      this.currentExercise.duration,
      progress
    );
    this.currentExercise.calories = this.calculatePercentageProgress(
      this.currentExercise.calories,
      progress
    );
    this.currentExercise.state = 'cancelled';
  }

  private calculatePercentageProgress(
    unitToMeasure: number,
    progress: number
  ): number {
    return unitToMeasure * (progress / 100);
  }

  private completeCurrentExercise(): void {
    this.currentExercise.state = 'completed';
  }

  private setCurrentExercise(selectedId: string): void {
    this.currentExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
  }

  private clearCurrentExercise(): void {
    this.currentExercise = null;
  }

  private emitCurrentExercise(): void {
    this.exerciseChanged.next({ ...this.currentExercise });
  }

  private emitClearedExercise(): void {
    this.exerciseChanged.next(null);
  }
}
