import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';
import { HostBinding } from '@angular/core';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { DbService } from './Services/db/db.service';
import { LocalStorageService } from './Services/Storage/local-storage.service';
// import * as globals from './../assets/db/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('homePage <=> aboutPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('2000ms ease-out', style({ left: '0%' }))
          ]),
        ]),
      ]),
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
          ]),
          query(':enter', [
            animate('200ms ease-out', style({ left: '0%' }))
          ]),
          query('@*', animateChild())
        ]),
      ])
    ])
  ]
})
export class AppComponent {
  title = 'my-portfolio';
  darkMode: boolean = false;
  firstRun = true;

  @HostBinding('class') className ='';

  constructor(private contexts:ChildrenOutletContexts, private darkModeService: DbService, private localStorage: LocalStorageService){}
  getRouteAnimationData(){
    // console.log(this.contexts.getContext('primary'))
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    // return 'routeAnimations'
  }
  ngOnInit(): void{
    this.darkModeService.getValue().subscribe(x =>{
      const darkClassName = 'darkMode';
      if(this.localStorage.getMode() == "dark"){
        this.className = darkClassName;
        this.darkMode = true;
      }
      else{
        this.className = x ? darkClassName:''; 
        if(x){
          this.localStorage.setMode('dark');
          this.darkMode = true;
        }
        else{
          this.darkMode = false;
        }
      }  
    })
  }
  counter(i: number) {
    return new Array(i);
  }
  getValLeft(i:any){
    if(i==49){
      this.firstRun=false;
    }
    let val = this.getRndInteger(0,2160)+ i;
    return `${val}px`
  }

  getValTop(i:any){
    if(i==49){
      this.firstRun=false;
    }
    let val = this.getRndInteger(0,1080) + i;
    return `${val}px`
  }

  getRndInteger(min: any, max:any) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
}
