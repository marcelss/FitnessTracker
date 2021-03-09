import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training-component';
import { NgpSortModule } from 'ngp-sort-pipe';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgpSortModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
