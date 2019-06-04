import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  private trainingSubscription: Subscription;

  ongoingTraining = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.subscribeToTrainingService();
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

  private subscribeToTrainingService(): void {
    this.trainingSubscription = this.trainingService.exerciseStarted$.subscribe(
      exerciseStarted => (this.ongoingTraining = exerciseStarted)
    );
  }
}
