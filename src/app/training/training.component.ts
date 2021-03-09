import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(e => {
      this.onGoingTraining = e ? true : false;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
