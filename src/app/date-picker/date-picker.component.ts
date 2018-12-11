import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  
  @Input('current-date') model;
  @Output('date-selected') dateSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectedDateChanged(date: NgbDate) { 
    this.dateSelected.emit(this.model);
  }
}
