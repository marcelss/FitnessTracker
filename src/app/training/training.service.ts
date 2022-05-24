import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];
  private exerciseCollection: AngularFirestoreCollection<Exercise>;

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>) {
    this.exerciseCollection = this.db.collection<Exercise>('availableExercises');
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading);
    this.fbSubs.push(this.exerciseCollection
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(doc => {
            const data = doc.payload.doc.data() as Exercise;
            return {
              id: doc.payload.doc.id,
              ...data
            };
          });
        }))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        this.store.dispatch(new UI.StopLoading);
        this.uiService.showSnackbar('Fetching Exercises failed, please try to reload the application');
        this.exercisesChanged.next([]);
      }));
  }

  fetchCompletedOrCanceledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Exercise;
            Object.keys(data).filter(key => data[key].constructor.name === 't')
              .forEach(key => data[key] = data[key].toDate());
            return {
              id: a.payload.doc.id,
              ...data
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  startExercise(selectedId: string) {
    this.db.doc(`availableExercises/${selectedId}`).update({ lastSelected: new Date() });
    this.runningExercise = this.availableExercises.find(
      x => x.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
