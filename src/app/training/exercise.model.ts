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

  addExercise(exercise: Exercise): void {
    this.exercises.push({
      ...exercise,
      date: new Date()
    });
  }
}
