import { Exercise } from './exercise.model';

export class ExerciseListing {
  private exercises: Exercise[];

  constructor() {
    this.exercises = [];
  }

  getExercises(): Exercise[] {
    return this.exercises.slice(); // return a copy
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push({
      ...exercise,
      date: new Date()
    });
  }
}
