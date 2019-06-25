import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  private exerciseSubscription: Subscription;

  ongoingTraining = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.subscribeToTrainingService();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
  }

  private subscribeToTrainingService(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged$.subscribe(
      exercise =>
        exercise
          ? (this.ongoingTraining = true)
          : (this.ongoingTraining = false)
    );
  }
}
