import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';

@Component({
  selector: 'app-livetext',
  templateUrl: './livetext.component.html',
  styleUrls: ['./livetext.component.scss'],
  animations:[
    trigger('openClose',[

      state('open',style({})),
      state('closed',style({})),
      transition('open => closed',[
        animate('0.25s')
      ]),
      transition('closed => open',[
        animate('0.25s')
      ])
    ])
  ]
})

export class LivetextComponent implements OnInit {
  isOpen = true
  onEvent:number[] = [];
  darkMode: boolean = true;
  @Input() string: String ='';

  constructor(
    private darkModeService: DbService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.darkModeService.getValue().subscribe(x =>{
      const darkClassName = 'darkMode';
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

  mouseEvent(event:String, index: any): void{
    if(event == 'in'){
      this.isOpen = !this.isOpen
      this.onEvent.push(index)
    }
    else{
      this.isOpen = !this.isOpen
      this.onEvent.pop()
    } 
  }

  addTrigger(index: any): any{
    if(this.onEvent.includes(index))
      return 'closed'
    return 'open'
  }

}
