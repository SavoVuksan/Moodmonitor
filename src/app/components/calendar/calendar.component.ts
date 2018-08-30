import { Component, OnInit } from '@angular/core';
import {Entry} from '../../classes/entry';
import {RestServiceService} from '../../services/rest-service.service';
import {Router} from '@angular/router';
import {SharedVarsService} from '../../services/shared-vars.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarRows;
  calendarCols;

  dayCount;
  selectedDate;
  today;

  entries: Entry[];

  constructor(private rest: RestServiceService,private router: Router,private sharedVars:SharedVarsService) {
    this.calendarRows = Array(5);
    this.calendarCols = Array(7);
    this.dayCount = this.daysInMonth(new Date());
    this.selectedDate = new Date();
    this.today = new Date();

    this.entries = new Array<Entry>();
    let fromTo = this.getRange();

    this.rest.getRangeEntries(fromTo[0],fromTo[1]).subscribe((data) =>{
      data.forEach((element) =>{
        let entry = new Entry(new Date(element.date));
        entry.moodText = element.moodText;
        entry.tags = element.tags;
        entry.posEmotions = element.posEmotions;
        entry.negEmotions = element.negEmotions;
        this.entries.push(entry);
      });
    });
  }

  ngOnInit() {
  }

  getRange(){
    let from = new Date(this.selectedDate);
    from.setDate(1);
    from.setHours(0,0,0,0);
    let to = new Date(from);
    to.setDate(this.calendarCols.length*this.calendarRows.length+1);
    return [from,to];
  }

  daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth()+1,0).getDate();
  }
  changeMonth(amount: number){
    this.selectedDate.setMonth(this.selectedDate.getMonth() + amount);
    this.dayCount = this.daysInMonth(this.selectedDate);
  }
  changeYear(amount: number){
    this.selectedDate.setFullYear(this.selectedDate.getFullYear()+amount);
    this.dayCount = this.daysInMonth(this.selectedDate);
  }
  getMonthName(date: Date){
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[date.getMonth()];
  }
  hasFieldEntry(field: number) {
    let date = new Date(this.selectedDate);
    let type = '';
    date.setDate(field);
    this.entries.forEach((element) =>{
      if(element.date.getFullYear() === date.getFullYear() && element.date.getMonth() === date.getMonth() && element.date.getDate() === date.getDate()) {
        if(element.posEmotions.length > 0){
          if(element.negEmotions.length > 0){
            type = 'entry neut';
          }else{
            type = 'entry pos';
          }
        }else{
          type = 'entry neg';
        }
        return true;
      }
    });
    return type;

  }
  isFieldToday(field : number){
    let date = new Date(this.selectedDate);

    date.setDate(field);
    if(date.getFullYear() === this.today.getFullYear() && date.getMonth() === this.today.getMonth() && date.getDate() === this.today.getDate()){
      return true;
    }
    return false;
  }

  viewEntry(field: number){
    if(this.hasFieldEntry(field) !== ''){

      //Switch to list view when there are more than 1 entry
      if(this.entriesPerDay(field) > 1){
        this.sharedVars.selectedDayEntries = this.getSelectedDayEntries(field);
        const selDate = new Date(this.selectedDate);
        selDate.setDate(field);
        this.sharedVars.selectedDay = selDate;
        // WEIL ICH GLAUB DAS ICH ZUHAUSE MICH SEHR UNWOHL FÜHL UND DORT NICHT RUNTERKOMMEN KANN UND DESWEGEN MIR DENK HEY ICH WILL
        // WEG UND DANN MACH ICH KEINE WORKOUTS
        this.router.navigateByUrl('/entryList');
      }else{

      }
    }
  }
  getSelectedDayEntries(field: number){
    const date = new Date(this.selectedDate);
    date.setDate(field);
    return this.entries.filter((val) =>{
      return (val.date.getFullYear() === date.getFullYear() && val.date.getMonth() === date.getMonth() && val.date.getDate() === date.getDate());
    });
  }
  entriesPerDay(field: number){
    const date = new Date(this.selectedDate);
    let count = 0;
    date.setDate(field);
    this.entries.forEach((val) =>{
      if(val.date.getFullYear() === date.getFullYear() && val.date.getMonth() === date.getMonth() && val.date.getDate() === date.getDate()){
        count++;
      }
    });
    return count;
  }

}
