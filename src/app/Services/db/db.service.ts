import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private darkMode: BehaviorSubject<boolean>

  constructor() {
    this.darkMode = new BehaviorSubject<boolean>(false)
   }

  getValue(): Observable<boolean>{
    return this.darkMode.asObservable();
  }

  setValue(newValue: boolean): void{
    this.darkMode.next(newValue)
  }
}
