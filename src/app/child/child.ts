import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})
export class Child {
  @Input() employeeName:string="";
  @Input() empId:string="";
  @Input() email:string=""
  @Input() greetingMsg:string="";
  isLoading:boolean=false

  greetChild(){
    console.log(this.greetingMsg);
    this.isLoading=true;

    
  }
}
