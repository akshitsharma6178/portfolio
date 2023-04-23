import { Component, ElementRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';
import { DbService } from 'src/app/Services/db/db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations:[
    trigger('openClose',[

      state('open',style({
        opacity:'0.5'})),
      state('closed',style({
        opacity:'1'})),
      transition('open => closed',[
        animate('0.25s')
      ]),
      transition('closed => open',[
        animate('0.25s')
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit {
  name = "Akshit Sharma"
  isOpen = true
  isHover = false;
  darkMode = false;
  onEvent:number[] = [];
  constructor(
    private local: LocalStorageService,
    private darkModeService: DbService,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    // document.getElementById('heightProp')?.style.setProperty('height',"100vh")
    // document.getElementById('animProp')?.style.setProperty('height',"100%")
    this.darkModeService.getValue().subscribe(x =>{
      if(this.local.getMode() == "dark")
        this.darkMode = true;
      else{
        this.darkMode = x ? true:false; 
      }  
    })
  }

  mouseEvent(event: any, type: any): void{
    // if(event == 'in'){
    //   this.isOpen = !this.isOpen
    //   this.onEvent.push(index)
    // }
    // else{
    //   this.isOpen = !this.isOpen
    //   this.onEvent.pop()
    // }
    let rect = event.target.getBoundingClientRect()
    let x = event.clientX - (rect.left + rect.right) /2;
    let y = -(event.clientY - (rect.top + rect.bottom)/2);
    // let str = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)})`;
    // // console.log(str)
    // // // console.log(this.elRef)
    // document.getElementById("img")?.style.setProperty('--style',str)
    let inner  = document.getElementById('img');
    let avt = document.getElementById("avt")
    let mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event: any) {
        this.x = x;
        this.y = y;
      },
      setOrigin: function(e: any){
        this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
      }
    }
    mouse.setOrigin(avt);
      let update = function(event:any) {
        mouse.updatePosition(event);
        // console.log(inner)
        if(inner){
          // console.log('here')
          updateTransformStyle(
            (mouse.y / inner?.offsetHeight/2).toFixed(2),
            (mouse.x / inner?.offsetWidth/2).toFixed(2)
          );
        }
      };

    
    
    let updateTransformStyle = function(x:any, y:any) {
      var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
      // console.log(style)
      if(inner){
        inner.style.transform = style;
        inner.style.webkitTransform = style;
        // inner.style.mozTransform = style;
        // inner.style.msTransform = style;
        // inner.style.oTransform = style;
      }
    };
    if(type == 'in')
      update(event)
    else if(type == 'out')
    if(inner)
      inner.style.transform = ""

  }

  addTrigger(index: any): any{
    if(this.onEvent.includes(index))
      return 'closed'
    return 'open'
  }
}
