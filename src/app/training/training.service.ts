import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'jumping-jacks', name: 'Jumping Jacks', duration: 30, calories: 8 }
  ];
  /** stores currently running exercise in the app */
  private currentExercise: Exercise;
  private exerciseChanged = new Subject<Exercise>();
  private completedExercises: Exercise[] = [];

  public readonly exerciseChanged$: Observable<
    Exercise
  > = this.exerciseChanged.asObservable();

  constructor() {}

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice(); // will create new copy of the array; allow to edit array in other areas without changing original
  }

  getCurrentExercise(): Exercise {
    return { ...this.currentExercise };
  }

  startExercise(selectedId: string): void {
    this.setCurrentExercise(selectedId);
    this.emitCurrentExercise();
  }

  completeExercise() {
    this.completedExercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    });
    this.currentExercise = null;
    this.exerciseChanged.next(null);
    //this.emitCurrentExercise();
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.currentExercise = null;
    this.exerciseChanged.next(null);
    //this.emitCurrentExercise();
  }

  private setCurrentExercise(selectedId: string): void {
    this.currentExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
  }

  private emitCurrentExercise(): void {
    this.exerciseChanged.next({ ...this.currentExercise });
  }
}
