import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-form',
  styleUrl: './form.css',
  template:`
   <h1>Form Binding Component</h1>
   <input type="text" [(ngModel)]="firstName"/>
   <h2>My name is : {{firstName}}</h2>
  `,
})
export class Form {
}
