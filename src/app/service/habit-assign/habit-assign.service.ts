import { LocalStorageService } from '../localstorage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mainLink } from '../../links';

import { HabitAssignDto } from 'src/app/model/habit/HabitAssignDto';
// import { HabitStatusDto } from 'src/app/model/habit/';
// import { HabitCalendarDto } from 'src/app/model/habit/';


@Injectable({
  providedIn: 'root'
})
export class HabitAssignService {
  apiUrl = `${mainLink}/habit/assign`;
  userId: number;

  private $habitStatus = new BehaviorSubject<any[]>([]);

  private dataStore : {
    habitStatus: any[]
  } =
  {
    habitStatus: []
  }

  readonly habitStatus = this.$habitStatus.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    localStorageService.userIdBehaviourSubject.subscribe(userId => this.userId = userId);
  }

  getActiveDateHabits(date: string, language: string): Observable<HabitAssignDto[]> {
    console.log(language)
    return this.http.get<HabitAssignDto[]>(
      `${this.apiUrl}/active/${date}?lang=${language}`
    );
  }

  enrollHabitForSpecificDate(habitId: number, date: string){
    if (habitId === undefined) {
      return of<any>();
    }
    if (date === undefined) {
      return of<any>();
    }
    const body = {
      id: habitId,
      date: date
    };
    return this.http.post(`${this.apiUrl}/${habitId}/enroll/`, this.habitStatus);
  }

  unenrollHabitForSpecificDate(habitId: number, date: string){
    if (habitId === undefined) {
      return of<any>();
    }
    if (date === undefined) {
      return of<any>();
    }
    const body = {
      id: habitId,
      date: date
    };
    return this.http.post(`${this.apiUrl}/${habitId}/unenroll/${date}`, this.habitStatus);
  }
}
