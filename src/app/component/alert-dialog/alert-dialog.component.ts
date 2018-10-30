import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Notification } from '../../model/notification';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  private audio: HTMLAudioElement;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Notification) {
  }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = "/fixTrading/assets/sounds/ElevatorDing.mp3";
    this.audio.load();
    const intervalID = setInterval(() => this.audio.play(), 3000);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog is closed');
      clearInterval(intervalID);
    });
  }

}
