import { Component, signal } from '@angular/core';
// import { Parent } from './parent/parent';
import { Form } from './form/form';

@Component({
  imports: [Form],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  title = signal('angular-app');
  name:string="ajay";
  greet():void{
     this.name="vijay"
     console.log(this.name);
     
  }
}
