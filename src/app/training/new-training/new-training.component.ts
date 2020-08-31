import { Component, OnInit } from '@angular/core';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  foods: Food[] = [
    {value: 'crunches', viewValue: 'Crunches'},
    {value: 'touch-toes', viewValue: 'Touch Toes'},
    {value: 'side-lunges', viewValue: 'Side Lunges'},
    {value: 'burpees', viewValue: 'Burpess'}
  ];

  constructor() { }

  ngOnInit() {

  }
}
