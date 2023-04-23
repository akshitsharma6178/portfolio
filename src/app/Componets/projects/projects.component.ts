import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { orange } from '@mui/material/colors';
import {Subscription, timer} from 'rxjs';  
// import { ModalsComponent } from '../modals/modals.component';
import * as THREE from 'three';
import {IntervalTimer} from './interval'
import { map, catchError } from 'rxjs/operators';
import { DbService } from 'src/app/Services/db/db.service';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations:[
    trigger('openClose',[

      state('open',style({
        // height:'+50px',
        width:'45%'})),
      state('closed',style({
        width:'75%',
        height:'25vh',
        // background:'linear-gradient(to bottom right, gray, white)',
      })),
      transition('open => closed',[
        animate('0.25s')
      ]),
      transition('closed => open',[
        animate('0.25s')
      ])
    ]), 
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('3s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.5s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ] 

})




export class ProjectsComponent implements OnInit {
  mouse: any;
  raycaster: any;
  combinations:any;
  timerSubscription: any;
  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    this.x = event.clientX/ window.innerWidth;
    this.y = event.clientY/ window.innerHeight
  }
  isOpen = true;
  scene: any;
  camera:any;
  string = "Projects";
  projectList: string[];
  projectDisc: any ={};
  geometry:any;
  material:any;
  mesh: any;
  renderer: any;
  textureLoader: any;
  texture: any;
  hover1: any = 0;
  i = 1;
  _x: any;
  _y: any;
  x: any;
  y: any;
  wrapper: any;
  selectedObj: any;
  prev = 0;
  intervalId: any;
  currentInd: any;
  actual: any;
  expanded: any;
  darkMode = false;
  constructor(private dialog: MatDialog, private darkModeService: DbService, private localStorage: LocalStorageService) { 
    this.projectList = [
      'Manyata',
      'Washbat',
      'Trilingo',
      'Portfolio Design',
      'SQL-Powered Blog: Hierarchy & CRUD',
      'AutoDrive: AI-Powered Navigation'
    ]
    // this.projectDisc={
    //   'Manyata':'Completely redesigned and refactored the core of the Application. Made significant changes to the login/ signup process and implement a payment gateway.',
    //   'Washbat':'Impleted Multi-Language RTL support, made the core web app structure Arabic compatiable.',
    //   'Trilingo':'Build a native mobile application to teach and store tribal languages to General Public. Made it possible for native users to update the database with audio prounciation and spellings.',
    //   'Portfolio Design':'Worked with several clients to deliver their Portfolios.',
    //   'Blog': 'Full-Fledged working Blog with multi-level user heirarchy, and nested comment within commments.',
    //   'Self-Driving AI':'AI that can drive in the world of GTA V without any Human Inputs'
    //   }
      this.projectDisc={
        'Manyata':[
          'Redesigned certification web application with revamped front-end and back-end.',
          'Implemented optimized database schema design with appropriate relationships and associations between data entities to support new features and improve data retrieval and manipulation.',
          'Implemented offline functionality using local storage for seamless user experience in offline mode.',
        ],
        'Washbat':[
          'Implemented multi-language RTL (right-to-left) support in web app.',
          'Modified core web app structure to be compatible with Arabic language.',
          'Enabled seamless switching between different languages, including Arabic, within the web app.',
        ],
        'Trilingo':[
          'Developed a cross-platform native mobile application using Flutter to teach and store tribal languages for the general public.',
          "Enabled native users to update the application's database with audio pronunciation and spellings of tribal languages, making it accessible on multiple platforms.",
          'Implemented multi-user support in the Flutter-based mobile app using Firebase as the backend database.',
          "Utilized Firebase's real-time data synchronization capabilities to enable real-time updates and changes for multiple users in the app.",
          'Implemented appropriate data access and manipulation methods, such as CRUD (Create, Read, Update, Delete) operations, using Firebase APIs to interact with the database in a multi-user environment.'
        ],
        'Portfolio Design':[
          'Worked with multiple clients to develop their portfolios using Angular as the frontend framework.',
          "Collaborated with clients to understand their requirements and translate them into functional portfolio websites.",
          "Utilized Angular's features, such as components, directives, and services, to create dynamic and interactive user interfaces for the portfolios.",
          "Implemented efficient data binding and state management techniques in Angular to ensure smooth navigation and seamless user experience."
        ],
        'SQL-Powered Blog: Hierarchy & CRUD':[
          'Developed a full-fledged working blog using SQL as the backend database to store and manage blog posts, comments, and user hierarchy.',
          "Implemented appropriate SQL database design and schema to support multi-level user hierarchy and nested comments.",
          "Developed server-side APIs or endpoints to handle CRUD (Create, Read, Update, Delete) operations on blog posts, comments, and user roles, integrating with the SQL database.",
          "Utilized SQL joins and relationships to establish connections between related data entities, such as blog posts, comments, and users."
        ],
        'AutoDrive: AI-Powered Navigation':[
          'Developed an artificial intelligence (AI) system capable of autonomously driving in the virtual world of GTA V (Grand Theft Auto V) without any human inputs.',
          "Fine-tuned the AI model iteratively based on performance feedback and evaluation results to improve its driving skills and adaptability to different situations",
          "Utilized machine learning algorithms, such as reinforcement learning or deep learning, to train the AI model to navigate and interact with the virtual environment of GTA V."
        ],
        
        }
    this.expanded={
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    }
  }
  onEvent:number[] = [];
  ngOnInit(): void {
    this.wrapper = document.getElementById("wrapper");
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

    this.combinations = [
      { configuration: 1, roundness: 1 },
      { configuration: 1, roundness: 2 },
      { configuration: 1, roundness: 4 },
      { configuration: 2, roundness: 2 },
      { configuration: 2, roundness: 3 },
      { configuration: 3, roundness: 3 }
    ];
    this.wrapper.dataset.configuration = this.combinations[0].configuration;
    this.wrapper.dataset.roundness = this.combinations[0].configuration;
    // if(!this.intervalId){

      // this.timerSubscription = timer(0, 3000).pipe( 
      //   map(() => { 
      //     let index = this.uniqueRand(0, this.combinations.length - 1, this.prev),
      //     combination = this.combinations[index];
      //     this.wrapper.dataset.configuration = combination.configuration;
      //     this.wrapper.dataset.roundness = combination.roundness;
      //     this.prev = index;
      //   }) 
      // ).subscribe();
    // }
    this.intervalId = setInterval(()=>{
          let index = this.uniqueRand(0, this.combinations.length - 1, this.prev),
          combination = this.combinations[index];
          this.currentInd = index
          this.wrapper.dataset.configuration = combination.configuration;
          this.wrapper.dataset.roundness = combination.roundness;
          this.prev = index;
    },3000);
    // this,this.intervalId.pause()
    // document.getElementById('heightProp')?.style.setProperty('height',"100vh");
    // document.getElementById('animProp')?.style.setProperty('height',"100vh");
  }

  // mouseMove(event: any){
  //   console.log(event)
  //   this._x = event.clientX/ window.innerWidth;
  //   this._y = event.clientY/ window.innerHeight;
  // }

  uniqueRand(min: any, max: any, prev: any) {
    let next = prev;
    if(max == min) return min
    
    while(prev === next) next = this.rand(min, max);
    
    return next;
  }

  ngOnDestroy(){
    clearInterval(this.intervalId)
  }

  setHover(val: boolean){

    if(val){ 
      let temp = this.combinations[this.currentInd]
      this.combinations = [temp? temp: { configuration: 1, roundness: 1 }]
      this.actual = this.currentInd
    }
    if(!val){
      this.combinations = [
        { configuration: 1, roundness: 1 },
        { configuration: 1, roundness: 2 },
        { configuration: 1, roundness: 4 },
        { configuration: 2, roundness: 2 },
        { configuration: 2, roundness: 3 },
        { configuration: 3, roundness: 3 }
      ];
    }
    this.currentInd = this.actual
    console.log(val, this.combinations)
  }

  expand(id: any){
    let temp;
    this.expanded[id] = !this.expanded[id]
    if(this.expanded[id]){
      this.setHover(true)
    }
    else{
      this.setHover(true)
    }

  }

  rand(min: any, max: any){
    return Math.floor(Math.random()* (max- min + 1) + min)
  }
  // ngAfterViewInit(){
  //     setInterval(()=>{
  //       let index = this.uniqueRand(0, this.combinations.length - 1, this.prev),
  //       combination = this.combinations[index];
  //       this.wrapper.dataset.configuration = combination.configuration;
  //       this.wrapper.dataset.roundness = combination.roundness;
  //       this.prev = index;
  //     },3000)
  //     this.scene = new THREE.Scene();
  //     this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  //     this.scene.add(this.camera);
  //     this.textureLoader = new THREE.TextureLoader();
  //     this.texture = this.textureLoader.load('https://bruno-simon.com/prismic/matcaps/8.png');
  //     this.camera.position.z = 3;
  //     this.geometry  = new THREE.BoxGeometry(1.3,1.3,1.3);
  //     let materials = [];
  //     for (var i = 0; i < 6; i ++) {
  //       materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
  //     }
  //     this.material = new THREE.MeshBasicMaterial({color: 'orange'})
  //     this.mesh = new THREE.Mesh(this.geometry, materials)
  //     this.scene.add(this.mesh)
  //     this.mesh.rotation.x = Math.PI/4;
  //     this.mesh.rotation.y = Math.PI/4;
  //     this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
  //     this.renderer.setSize(window.innerWidth/2,innerHeight/2)
  //     this.renderer.domElement.classList.add('canvas')
  //     this.raycaster = new THREE.Raycaster();
  //     let isDragging = false;
  //     let previousMousePosition = {
  //         x: 0,
  //         y: 0
  //     };
  //     let current_dom = document.getElementById('projects')
  //     this.renderer.domElement.addEventListener("click", (e: any) => {
  //       this.mouse = new THREE.Vector2();
  //       // isDragging = true;
  //       this.raycaster.setFromCamera(this.mouse, this.camera);
  //       let intersect = this.raycaster.intersectObjects(this.scene.children, false);

  //       if(intersect.length > 0){
  //         this.selectedObj = intersect[0]
  //         console.log(this.selectedObj)
  //       }
  //     });
  //     this.renderer.domElement.addEventListener("mousedown",(e: any) => {
  //       isDragging = true;
  //     })

  //     this.renderer.domElement.addEventListener("mousemove",(e:any) =>{
  //       let deltaMove = {
  //         x: e.offsetX - previousMousePosition.x,
  //         y: e.offsetY - previousMousePosition.y 
  //         } 
  //         if(isDragging){
  //           let deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(this.toRadians(deltaMove.y * 1), this.toRadians(deltaMove.x * 1),0,'XYZ'));
  //           this.mesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.mesh.quaternion)
  //         }
  //         previousMousePosition = {
  //           x: e.offsetX,
  //           y: e.offsetY
  //         }
  //     })

  //     this.renderer.domElement.addEventListener("mouseup", (e: any)=>{
  //       isDragging = false;
  //     })
      
  //     if(!current_dom?.hasChildNodes())
  //       current_dom?.appendChild(this.renderer.domElement)


      
  //     this.animate()

  // }


  animate(){
    setTimeout(() => {
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene,this.camera)
    }
  ,1000 / 60 );
  this.mesh.rotation.y += 0.01
  this.mesh.rotation.x += 0.01
  this.mesh.rotation.z += 0.01

  }

  // liveView(){
  //   this.dialog.open(ModalsComponent,{data:{
  //     src: "https://www.manyataformothers.org/certification/#/login"
  //   }})
  // }

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

  toRadians(angle: any){
    return angle * (Math.PI /180)
  }

}
