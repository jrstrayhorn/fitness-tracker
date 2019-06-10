import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  stop() {
    this.deleteTimer();
    const dialogRef = this.openStopTrainingDialogAndCreateRef();
    this.subscribeToDialogAfterClosed(dialogRef);
  }

  private openStopTrainingDialogAndCreateRef(): MatDialogRef<
    StopTrainingComponent,
    boolean
  > {
    return this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });
  }

  private subscribeToDialogAfterClosed(
    dialogRef: MatDialogRef<StopTrainingComponent, boolean>
  ): void {
    dialogRef.afterClosed().subscribe(isExitConfirmed => {
      isExitConfirmed
        ? this.trainingService.cancelExercise(this.progress)
        : this.startOrResumeTimer();
    });
  }

  private startOrResumeTimer() {
    const intervalToCheckProgress = this.getTimerIntervalBasedOnExerciseDuration(
      this.trainingService.getCurrentExerciseDuration()
    );
    this.timer = this.createTimer(intervalToCheckProgress);
  }

  private createTimer(step: number): number {
    return <any>setInterval(() => {
      this.increaseProgress();
      this.checkProgress();
    }, step);
  }

  private increaseProgress(): void {
    this.progress++;
  }

  private checkProgress(): void {
    if (!this.isProgressDone()) return;
    this.trainingService.completeExercise();
    this.deleteTimer();
  }

  private deleteTimer(): void {
    clearInterval(this.timer);
  }

  private isProgressDone(): boolean {
    return this.progress >= 100;
  }

  private getTimerIntervalBasedOnExerciseDuration(duration: number): number {
    return (duration / 100) * 1000;
  }
}
