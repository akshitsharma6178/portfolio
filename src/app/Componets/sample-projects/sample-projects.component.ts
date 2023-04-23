import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { LocalStorageService } from 'src/app/Services/Storage/local-storage.service';

// export type MyType = 'input' | 'button';
export type MyType = 'input';

@Component({
  selector: 'app-sample-projects',
  templateUrl: './sample-projects.component.html',
  styleUrls: ['./sample-projects.component.scss']
})
export class SampleProjectsComponent implements OnInit {
  string:string = "Samples"
  formGroup: FormGroup;
  storageEnable: boolean;
  panelOpenState = false;
  input = [
    {'name':'name','label':'Name'}
  ]
  types =[
    {'type':'input','viewType':'Input','state':false},
    // {'type':'button','viewType':'Button','state':false}
  ]
  button=[
    {'name':'name'},
    {'name':'hello'},
    {'name':'hello1'}
  ];
  addControl = false;
  addControlGroup: FormGroup;
  selectedControl: String[] = [];

  constructor(formBuilder: FormBuilder,
    private fb: FormBuilder,
    private storage: LocalStorageService) { 
    this.formGroup = formBuilder.group({
      enableLocalStore: '',
      name:''});

    this.addControlGroup = formBuilder.group({
      type:[''],
      label:'',});
    this.storageEnable = false;
  }

  ngOnInit(): void {
    let name = this.storage.getName()
    if(name){
      let objKeys = Object.keys(name);
      objKeys.map(k =>{
          this.formGroup.addControl(k,this.fb.control(name[k]))
          this.formGroup.controls[k].setValue(name[k])
          if(k != 'name' && k != 'enableLocalStore'){
            let arr = k.split("+");
            let type: MyType = arr[0] as MyType;
            this[type].push({
              'name':k,
              'label':arr[2]
            })
          }
      })
      this.panelOpenState = true;
      this.storageEnable = true;
      this.formGroup.controls['enableLocalStore'].setValue(this.storageEnable);
    }
  }

  enableLocal(): void{
    this.storageEnable = this.formGroup.controls['enableLocalStore'].value;
  }

  onSubmit(): void{
    console.log(this.formGroup.value);
    if(this.storageEnable)
      this.storage.setName(this.formGroup.value);
  }

  clearStorage():void{
    this.formGroup.reset();
    this.storage.clearStorage();
  }
  
  onAddControl():void {
    const dropdownValue = this.addControlGroup.get('type')?.value;
    const index: MyType = dropdownValue ? dropdownValue as MyType: 'input';
    const len = this[index].length;
    this.formGroup.addControl(`${index}+${len+1}+${this.addControlGroup.controls['label'].value}`,this.fb.control(''))
    this[index].push({
      'name':`${index}+${len+1}+${this.addControlGroup.controls['label'].value}`,
      'label':this.addControlGroup.controls['label'].value
    });
  }

  toggleSelection(chip: MatChip){
    chip.toggleSelected();
    console.log(this.addControlGroup.controls['type']);
  }

  changeSelected(event: any, type: any){
    type.state = event.selected
    if(event.selected)
      this.selectedControl.push(event.source._value);
    else{
      this.selectedControl = this.selectedControl.filter(x => x != event.source._value)
    }
  }

  checkEnable(type: String){
    if(this.selectedControl.includes(type))
      return true;
    return false;
  }

  remControl(control: any){
    let arr = control.name.split("+");
    let type: MyType = arr[0] as MyType;
    this[type] = this[type].filter(x => x != control);
    this.formGroup.removeControl(control.name);
  }

  checkName(name: any){
    if(name === "name"){
      return false;
    }
    return true
  }
}
