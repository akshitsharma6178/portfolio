import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getName(){
    let result = localStorage.getItem('name');
    return JSON.parse(String(result));
  }

  public setName(value : any){
    let val = JSON.stringify(value);
    localStorage.setItem('name',val)
  }

  public setMode(value: any){
    let val = JSON.stringify(value)
    localStorage.setItem('mode',val)
  }

  public getMode(){
    let result = localStorage.getItem('mode');
    return JSON.parse(String(result));
  }

  public clearStorage(){
    localStorage.clear();
  }
}
