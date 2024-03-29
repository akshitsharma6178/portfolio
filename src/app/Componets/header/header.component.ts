import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  panelOpenState = false;
  darkMode: boolean = false;
  constructor(
    private router:Router,
    private local: LocalStorageService,
    private darkModeService: DbService,
    private elementRef: ElementRef
    ) {
      // if(this.local.getMode() == 'dark'){
      //   this.darkMode = true;
      // }
      // else{
      //   this.darkMode = false;
      // }
    }
 
  ngOnInit(): void {
    // this.darkModeService.getValue().subscribe(x =>{
    //   this.darkMode = x;
    // })

    this.darkModeService.getValue().subscribe(x =>{
      if(this.local.getMode() == "dark")
        this.darkMode = true;
      else{
        this.darkMode = x ? true:false; 
      }  
    })

  }

  btnClick(name:string): void {
    if(name === "blog") {
      window.open("https://blog.akshitsharma6178.com", "_blank");
      return
    }
    this.panelOpenState = false;
    const newURL = window.location.origin + '/#' + name; // Construct the new URL
    window.location.href = newURL;
  }



}
