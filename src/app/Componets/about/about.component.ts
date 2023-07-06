import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';
import TagCloud, { TagCloudOptions } from 'TagCloud'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy{
  // container = this.containerElement ? this.containerElement : [];
  string: string= 'About'
  darkMode: boolean = false;
  texts = [
    "HTML",
    "CSS",
    "Angular",
    "JavaScript",
    "React",
    "Python",
    "Firebase",
    "NodeJS",
    "Flutter",
    "Jquery",
    "ES6",
    "GIT",
    "GITHUB",
    "TypeScript",
    "JAVA",
    "DraftJs",
    "Vite"
  ];

  options: TagCloudOptions ={
  }
  
  // tagCloud = new TagCloud(this.container, this.texts, this.options)
  initLoad: boolean = true;
  private subscription!: Subscription
  constructor(
    private darkModeService: DbService,
    private localStorage: LocalStorageService
  ) {}
  // ngAfterViewInit(): void {
  //   if (this.initLoad) {
  //     this.initLoad = false;
  //     TagCloud(this.container, this.texts, this.options);
  //   }
  // }
  ngOnInit(): void {
    this.subscription = this.darkModeService.getValue().subscribe(x =>{
      if(this.localStorage.getMode() == "dark"){
        this.darkMode = true;
        // TagCloud(this.container, this.texts, this.options);
      }
      else{ 
        if(x){
          this.localStorage.setMode('dark');
          this.darkMode = true;
          // TagCloud(this.container, this.texts, this.options);
        }
        else{
          this.darkMode = false;
          // TagCloud(this.container, this.texts, this.options);
        }
      }  
    })
    this.options.keep = false;
    if (window.innerWidth > 1080) {
      this.options.radius = 300;
      this.options.maxSpeed = "normal";
      this.options.initSpeed = "normal";
    }
    else if (window.innerWidth <= 1080) {
      this.options.radius = 200;
      this.options.maxSpeed = "normal";
      this.options.initSpeed = "normal";
    }
    TagCloud("#tagCloud", this.texts, this.options);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
