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
  private exerciseStart = new Subject<boolean>();
  private exerciseChanged = new Subject<Exercise>();

  public readonly exerciseStarted$: Observable<
    boolean
  > = this.exerciseStart.asObservable();

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

  private setCurrentExercise(selectedId: string): void {
    this.currentExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
  }

  private emitCurrentExercise(): void {
    //this.exerciseStart.next(isRunning);
    this.exerciseChanged.next({ ...this.currentExercise });
  }
}
