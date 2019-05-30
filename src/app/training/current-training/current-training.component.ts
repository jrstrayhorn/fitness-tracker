import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  stop() {
    clearInterval(this.timer);
    let dialogRef: MatDialogRef<
      StopTrainingComponent,
      boolean
    > = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(isExitConfirmed => {
      if (isExitConfirmed) this.trainingExit.emit();
      this.startOrResumeTimer();
    });
  }

  startOrResumeTimer() {
    this.timer = <any>setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
