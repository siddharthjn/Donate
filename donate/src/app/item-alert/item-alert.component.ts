import { Component, OnInit } from '@angular/core';
const itemName = document.getElementById('itemName') as HTMLInputElement;
const form = document.getElementById('alertForm') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

@Component({
  selector: 'app-item-alert',
  templateUrl: './item-alert.component.html',
  styleUrls: ['./item-alert.component.css']
})

export class ItemAlertComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
