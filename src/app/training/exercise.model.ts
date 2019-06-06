export interface Exercise {
  id: string;
  name: string;
  duration: number; // in seconds
  calories: number;
  date?: Date; // not all will have dates
  state?: 'completed' | 'cancelled' | null;
}

export class ExerciseListing {
  private exercises: Exercise[];

  constructor() {
    this.exercises = [];
  }

  getExercises(): Exercise[] {
    return this.exercises.slice(); // return a copy
  }

  addCancelExercise(cancelExercise: Exercise): void {}

  addCompleteExercise(completeExercise: Exercise): void {}
}
