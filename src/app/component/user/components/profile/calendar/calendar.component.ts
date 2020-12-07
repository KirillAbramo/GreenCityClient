import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@language-service/language.service';
import { CalendarBaseComponent } from '@shared/components';
import { calendarIcons } from 'src/app/image-pathes/calendar-icons';
import { HabitAssignService } from '@global-service/habit-assign/habit-assign.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends CalendarBaseComponent implements OnInit, OnDestroy {
  public isHabitsPopUpOpen = false;
  public selectedDay: number;
  public habitsCalendarSelectedDate: string;
  public calendarIcons = calendarIcons;
  public isDayTracked: boolean;
  public formatedData: string;
  public isHabitListEditable: boolean;
  public isHabitEnrolled: boolean;
  public currentDate: Date = new Date();
  public habits2: any[];
  public daysCanEditHabits: number = 7;
  public isFetching: boolean;


  @HostListener('document:click', ['$event']) clickout(event) {
    this.closePopUp();
  }

  constructor(public translate: TranslateService,
              public languageService: LanguageService,
              public habitAssignService: HabitAssignService) {
                super(translate, languageService);
              }

  ngOnInit() {
    this.bindDefaultTranslate();
    this.subscribeToLangChange();
    this.buildCalendar();
  }

  public getFormatedData(dayItem) {
    this.formatedData = `${dayItem.year}-${ dayItem.month + 1 < 10 ? "0" + dayItem.month : dayItem.month + 1}-${dayItem.numberOfDate < 10 ? "0" + dayItem.numberOfDate : dayItem.numberOfDate}`;
  }

  public checkIfFuture(dayItem) {
    this.getFormatedData(dayItem);
    if (this.currentDate.setHours(0, 0, 0, 0) >= new Date(this.formatedData).setHours(0, 0, 0, 0)) {
      this.toggleHabitsList(dayItem);
    }
  }

  public toggleHabitsList(dayItem) {
    this.isFetching = true;
    this.isHabitsPopUpOpen = !this.isHabitsPopUpOpen;
    this.checkHabitListEditable();
    this.getActiveDateHabits(this.formatedData);
    this.selectedDay = dayItem.numberOfDate;
    this.habitsCalendarSelectedDate = this.months[dayItem.month] + " " + dayItem.numberOfDate + ", " + dayItem.year;
    this.isDayTracked = !this.isDayTracked;
  }

  public checkHabitListEditable() {
    this.isHabitListEditable = false;
    if(this.currentDate.setHours(0, 0, 0, 0) - this.daysCanEditHabits * 24 * 60 * 60 * 1000 <= new Date(this.formatedData).setHours(0, 0, 0, 0)) {
      this.isHabitListEditable = true;
    }
  }

  public getActiveDateHabits(date) {
    this.habits2 = [];
    this.habitAssignService.getActiveDateHabits(date, this.language).subscribe( data => {
      this.habits2 = [...data];
      this.habits2.forEach(habit => {
        habit.enrolled = this.checkIfEnrolledDate(habit);
      });
      this.isFetching = false;
    });
  }

  public enrollHabit(habit) {
    this.habitAssignService.enrollHabitForSpecificDate(habit.habit.id, this.formatedData);
  }

  public unEnrollHabit(habit) {
    this.habitAssignService.unenrollHabitForSpecificDate(habit.habit.id, this.formatedData);
  }

  public toggleEnrollHabit(habit) {
    this.isHabitListEditable ? habit.enrolled = !habit.enrolled : null
  }

  public sendEnrollRequest() {
    this.habits2.forEach(habit => {
      if(habit.enrolled !== this.checkIfEnrolledDate(habit)) {
        habit.enrolled ? this.enrollHabit(habit) : this.unEnrollHabit(habit);
      }
    });
  }

  public checkIfEnrolledDate(habit) {
    this.isHabitEnrolled = false;
    habit.habitStatusCalendarDtoList.forEach(date => {
      if (date.enrollDate === this.formatedData) {
        this.isHabitEnrolled = true;
      }
    });
    return this.isHabitEnrolled;
  }

  public markCalendarDays(habit) {
    
  }

  public closePopUp(){
    this.isHabitsPopUpOpen = this.isHabitsPopUpOpen ? false : null;
    this.isDayTracked = false;
    this.sendEnrollRequest();
  }
}
