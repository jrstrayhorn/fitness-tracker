import { Injectable } from '@angular/core';
import { Exercise, ExerciseListing } from './exercise.model';
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
  private completedExercises: Exercise[];
  private exerciseListing = new ExerciseListing();

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
    this.completeCurrentExercise();
    this.addCurrentExerciseToListing();
    this.resetCurrentExerciseState();
  }

  cancelExercise(progress: number) {
    this.cancelCurrentExercise(progress);
    this.addCurrentExerciseToListing();
    this.resetCurrentExerciseState();
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
