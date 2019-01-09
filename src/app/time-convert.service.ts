import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TimeConvertService {
  constructor() { }
  timeConvertFunction(val) {
    const array = [];
    val.forEach(element => {
      const splitDayTime = element.split(': ');
      const day = splitDayTime[0];
      const time = splitDayTime[1].toString();
      const time_split = time.split(' ');
      const start_time = time_split[0] + ' ' + time_split[1];
      const end_time = time_split[3] + ' ' + time_split[4];
      const start_time_converted = this.amPmTo(start_time);
      const end_time_converted = this.amPmTo(end_time);
      const obj = {
        date: day,
        fullDay: (start_time_converted === '00:00' && end_time_converted === '23:59') ? true : false,
        starttime: start_time_converted,
        endtime: end_time_converted
      };
      array.push(obj);
    });
    return array;
  }
  amPmTo(val) {
    const time = val;
    let hours = Number(time.match(/^(\d+)/)[1]);
    const minutes = Number(time.match(/:(\d+)/)[1]);
    const AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === 'PM' && hours < 12) { hours = hours + 12; }
    if (AMPM === 'AM' && hours === 12) { hours = hours - 12; }
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) { sHours = '0' + sHours; }
    if (minutes < 10) { sMinutes = '0' + sMinutes; }
    return sHours + ':' + sMinutes;
  }
}
