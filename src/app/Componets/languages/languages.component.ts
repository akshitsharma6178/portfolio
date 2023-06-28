import { animate, animateChild, animation, group, query, style, transition, trigger, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  animations:[
    // trigger(
    //   'inOutAnimation', 
    //   [
    //     transition(
    //       ':enter', 
    //       [
    //         style({ right:-100 }),
    //         animate('0.1s ease-in', 
    //                 style({ right: 0  }))
    //       ]
    //     ),
    //     transition(
    //       ':leave', 
    //       [
    //         // style({  }),
    //         animate('0s ease-in', 
    //                 style({  }))
    //       ]
    //     )
    //   ]
    // )
    trigger('slideInOut', [
      transition(':increment', [
        style({ position: 'relative' }),
        style({ transform: 'translateX(0%)' }),
        animate('400ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
      transition(':decrement', [
        style({ position: 'relative' }),
        style({ transform: 'translateX(-200%)' }),
        animate('400ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ])
  ]
})
export class LanguagesComponent implements OnInit {

  languageListShown: string[];
  languageList: string[];
  languageDisc: any ={};
  anim: boolean;
  string: string = "Technology Stack"
  darkMode = false;
  currentIndex = 0;

  // constructor( private darkModeService: DbService) { 
  //   iconRegistry.addSvgIconLiteral('github', sanitizer.bypassSecurityTrustHtml(GITHUB));
  //   iconRegistry.addSvgIconLiteral('linkdin', sanitizer.bypassSecurityTrustHtml(LINKDIN));
  // }
  constructor(@Inject(DOCUMENT) private document: Document, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private darkModeService: DbService, private localStorage: LocalStorageService) { 
    iconRegistry.addSvgIcon('android', sanitizer.bypassSecurityTrustResourceUrl("../../assets/images/android_try.svg"));
    this.languageListShown = [
      'angular',
      'react',
      'android'
  ]
    this.languageList = [
      'angular',
      'react',
      'android',
      'css',
      'firebase',
      'flutter',
      'java',
      'nodejs',
  ]
  this.languageDisc={
    'angular':'Angular is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.',
    'react': 'React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.',
    'android':'Android is a mobile operating system based on a modified version of the Linux kernel and other open source software, designed primarily for touchscreen mobile devices such as smartphones and tablets.',
    'css':'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    'firebase':'Firebase is a set of hosting services for any type of application. It offers NoSQL and real-time hosting of databases, content, social authentication, and notifications, or services, such as a real-time communication server.',
    'flutter':'Flutter is an open-source UI software development kit created by Google. It is used to develop cross platform applications for Android, iOS, Linux, macOS, Windows, Google Fuchsia, and the web from a single codebase',
    'java':'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
    'nodejs':'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine and executes JavaScript code outside a web browser, which was designed to build scalable network applications.'
  }
  this.anim = true;
  }
  // ngAfterViewInit(): void {
  //     setInterval( ()=>{
  //       if(this.languageListShown && this.languageList){
  //         // if(this.anim)
  //           this.nextSet()
  //         // else
  //           // setTimeout(()=>{this.setAnim();},10000)
  //       }
  //     }, 1500);
  // }

  ngOnInit(): void {
    this.darkModeService.getValue().subscribe(x =>{
      if(this.localStorage.getMode() == "dark"){
        this.darkMode = true;
      }
      else{
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

  smallerSize(index: number){
    if(index == 0 || index == this.languageListShown.length-1)
      return true
    return false
  }

  nextSet(){
    // this.anim = false;
    let last = this.languageListShown[this.languageListShown.length - 1];
    let index = this.languageList.indexOf(last);
    // let midSec = document.getElementById(`${index}`);
    // let style = `translateX(-25px)`
    // midSec?.style.setProperty('transform',style)
    for(let i=0;i<this.languageListShown.length;i++){
      if(i != this.languageListShown.length-1)
        this.languageListShown[i] = this.languageListShown[i+1];
      else{
        if(this.languageList[index + 1]){
          this.languageListShown[i] = this.languageList[index + 1];
        }  
        else{
          this.languageListShown[i] = this.languageList[0];
        }
      }
    }
    if (this.currentIndex < this.languageListShown.length - 1) {
      this.currentIndex++;
    }
  }


  previousSet(){
    // this.anim = false;
    let first = this.languageListShown[0];
    let index = this.languageList.indexOf(first);
    for(let i=this.languageListShown.length-1;i>=0;i--){
      if(i != 0)
        this.languageListShown[i] = this.languageListShown[i-1];
      else{
        if(this.languageList[index - 1]){
          this.languageListShown[i] = this.languageList[index - 1];
        }  
        else{
          this.languageListShown[i] = this.languageList[this.languageList.length-1];
        }
      }
    }
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  setAnim(){
    // this.anim = false;
  }

  lastItem(index:number){
    if(index == this.languageListShown.length-1)
      return true;
    return false;
  }
  secondLast(index:number){
    if(index == this.languageListShown.length-2)
      return true;
    return false;
  }
  isMobile(): boolean {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return true;
    }else{
      return false;
    }
  }
}
