import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  link: string = ''
  constructor(
    private dialogRef: MatDialogRef<ModalsComponent>, @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  public closeMe(){
    this.dialogRef.close()
  }

  getlink(){
    return this.data.src
  }

}
