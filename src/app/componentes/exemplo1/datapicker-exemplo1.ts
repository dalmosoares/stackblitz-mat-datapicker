import {Component} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

/** @title Datepicker input and change events */
@Component({
  selector: 'datapicker-exemplo1',
  templateUrl: 'datapicker-exemplo1.html',
  styleUrls: ['datapicker-exemplo1.css'],
})
export class DatapickerExemplo1 {
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}