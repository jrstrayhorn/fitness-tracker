import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

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

  constructor() {}

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice(); // will create new copy of the array; allow to edit array in other areas without changing original
  }
}
