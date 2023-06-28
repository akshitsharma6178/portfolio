import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';

export type myType = '1' | '2' | '3' | '4';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, AfterContentInit {
  // @HostListener('window:scroll',['$event']) onScrollEvent($event: any){
  //   let title = document.getElementById("title");
  //   let dec = document.getElementById("dec");
  //   let tl = document.getElementById("tl");
  //   // let x= 841
  //   // let y = 841-window.innerHeight;
  //   // let hi = ((window.pageYOffset+y) / (554 + y)) * 100
  //   // if(hi>100) hi=100

  //   let decHeight = dec ? dec.offsetHeight : 0; // Get the height of "dec" element
  //   let y = decHeight - window.innerHeight;
  //   let hi = ((window.pageYOffset + y) / (window.innerHeight + y)) * 100;
  //   if (hi > 100) hi = 100;
  //   if(window.innerWidth < 1277){
  //     tl?.style.setProperty('--dynHeight', `${hi}%`)
  //     if(hi >= 10){
  //       this.handleScrollEnable(1, true);
  //     }
  //     if(hi >= 27){
  //       this.handleScrollEnable(2, true);
  //     }
  //     if(hi >= 43){
  //       this.handleScrollEnable(3,true);
  //     }
  //     if(hi >= 59){
  //       this.handleScrollEnable(4,true);
  //     }
  //     if(hi >= 75){
  //       this.handleScrollEnable(5,true);
  //     }
  //     if(hi >= 93){
  //       this.handleScrollEnable(6,true);
  //     }

  //     if(hi < 10){
  //       this.handleScrollEnable(1, false);
  //     }
  //     if(hi < 27){
  //       this.handleScrollEnable(2,false)
  //     }
  //     if(hi < 43){
  //       this.handleScrollEnable(3,false);
  //     }
  //     if(hi < 59){
  //       this.handleScrollEnable(4,false);
  //     }
  //     if(hi < 75){
  //       this.handleScrollEnable(5,false);
  //     }
  //     if(hi < 93){
  //       this.handleScrollEnable(6,false);
  //     }
  // }
  //   // if(window.pageYOffset < 150){
  //   //   let style = `translate(-${2*window.pageYOffset}px,${window.pageYOffset}px)`
      
  //   //   title?.style.setProperty('transform', style)
      
  //   //   dec?.style.setProperty('transform',style)
  //   // }
  //   // else{
  //   //   let style = `translate(-300px,${window.pageYOffset}px)`
  //   //   title?.style.setProperty('transform', style)
  //   //   dec?.style.setProperty('transform', style)
  //   // }
  //   // console.log(window.pageYOffset)
  // }

  string: string= 'Journey';
  visibility = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false
  }

  visible_2021 = 'hidden';
  visible_2017 = 'hidden';

  darkMode = false;
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

  ngAfterContentInit() {
    this.handleClick(1)
    this.handleClick(2)
    this.handleClick(3)
    this.handleClick(4)
    this.handleClick(5)
    this.handleClick(6)
  }

  handleClick(id: any){
    let doc = document.getElementById(id)
    let doct = document.getElementById(`${id}t`)
    let ind = id as myType; 
    if(this.visibility[ind] == false){
      doc?.style.setProperty('opacity','1')
      doc?.style.setProperty('animation','0.5s fadeIn')
      doct?.style.setProperty('visibility', 'hidden')
      doct?.style.setProperty('animation', '1s fadeOut')
      this.visibility[ind] = true;
    }
    else{
      doc?.style.setProperty('animation', '0.5s fadeOut')
      doc?.style.setProperty('opacity','0')
      doct?.style.setProperty('visibility', 'visible')
      doct?.style.setProperty('animation', '0.5s fadeIn')
      this.visibility[ind] = false;
    }
  }

  handleScrollEnable(id: any, val: any){
    let doc = document.getElementById(id)
    let doct = document.getElementById(`${id}t`)
    if(val == true){
      doc?.style.setProperty('opacity','1')
      doc?.style.setProperty('animation','1s fadeIn')
      doct?.style.setProperty('visibility', 'hidden')
      doct?.style.setProperty('animation', '0.25s fadeOut')
    }
    else{
      doc?.style.setProperty('animation', '1s fadeOut')
      doc?.style.setProperty('opacity','0')
      doct?.style.setProperty('visibility', 'visible')
      doct?.style.setProperty('animation', '2.5s fadeIn')
    }
  }

}
