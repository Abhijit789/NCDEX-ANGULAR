import { Component } from '@angular/core';
import { Child } from '../child/child';

@Component({
  imports: [Child],
  selector: 'app-parent',
  styleUrl: './parent.css',
  templateUrl: './parent.html',
})
export class Parent {
  employeeName:string="Shashikumar";
  empId:string="TCS123";
  email:string="shashi@123gmail.com";
  greetingMsg:string="Good Morning";
}
