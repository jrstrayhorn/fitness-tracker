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
    this.getCurrentExercise();
    this.startOrResumeTimer();
  }

  stop() {
    clearInterval(this.timer);
    const dialogRef: MatDialogRef<
      StopTrainingComponent,
      boolean
    > = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(isExitConfirmed => {
      if (isExitConfirmed) {
        this.trainingService.cancelExercise(this.progress);
      }
      this.startOrResumeTimer();
    });
  }

  private getCurrentExercise() {
    console.log(this.trainingService.getCurrentExercise().name);
  }

  private startOrResumeTimer() {
    const step = this.getStep(
      this.trainingService.getCurrentExercise().duration
    );
    this.timer = <any>setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  private getStep(duration: number): number {
    return (duration / 100) * 1000;
  }
}
