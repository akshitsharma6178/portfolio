import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  string: string= 'About Me'
  darkMode: boolean = false;
  constructor(
    private darkModeService: DbService,
    private localStorage: LocalStorageService
  ) { }

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

}
