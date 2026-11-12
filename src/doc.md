What is Angular?
Angular is a TypeScript-based frontend framework developed by Google for building dynamic, scalable, single-page applications (SPAs).

Important characteristics:
- Component-based architecture.
- Dependency Injection.
- Two-way data binding.
- Routing.
- Forms management.
- HTTP client.
- RxJS and reactive programming.
- Built-in testing support.

Angular Architecture 


Building block	Purpose
Component	Controls a section of UI
Template	Defines HTML structure
Service	Contains reusable business or data logic
Dependency Injection	Supplies dependencies to classes
Directive	Changes DOM behavior or appearance
Pipe	Transforms displayed values
Router	Manages navigation
HttpClient	Communicates with backend APIs


Standalone vs module 

NgModule-based architecture:

Traditionally, components, directives and pipes were grouped into Angular modules.

Standalone architecture:

Standalone components can directly import the dependencies they need without being declared in an NgModule.


installation

npm install -g @angular/cli

ng new employee-management

cd employee-management

ng serve



Module 2: typescript
Angular uses TypeScript extensively. Prioritize these topics.
1. let, const and var
var	let	const
Function scoped	Block scoped	Block scoped
Can redeclare	Cannot redeclare in same scope	Cannot redeclare
Can reassign	Can reassign	Cannot reassign binding
Hoisted and initialized as undefined	Hoisted but in TDZ	Hoisted but in TDZ

2. Interface
Defines the structure of an object.
interface Employee {
  id: number;
  name: string;
  email: string;
  department?: string;
}


3. Class
class EmployeeService {
  constructor(
    private companyName: string
  ) {}

  getCompanyName(): string {
    return this.companyName;
  }
}


4. Access modifiers
- public: Accessible everywhere.
- private: Accessible only inside the class.
- protected: Accessible inside the class and subclasses.
- readonly: Prevents reassignment after initialization.

5. Generics
Generics in TypeScript
Generics in TypeScript allow us to create reusable, flexible, and type-safe functions, classes, interfaces, and components without specifying the exact data type in advance.


Generics allow us to write code that works with different data types while maintaining type safety.
1. Why do we need Generics?
Consider a function that returns the value passed to it.

Without Generics:

function getValue(value: any): any {
    return value;
}

let result1 = getValue(100);
let result2 = getValue("Hello");

console.log(result1);
console.log(result2);

Problem with any:
- TypeScript does not know the actual return type.
- We lose type safety.
- We don't get proper IntelliSense.

Generics allow reusable, type-safe code.
function getData<T>(data: T): T {
  return data;
}

const employee = getData<Employee>({
  id: 1,
  name: 'Rahul',
  email: 'rahul@gmail.com'
});


6. Promise vs Observable
Promise   	                       Observable
Emits one result	               Can emit multiple values
Eager execution	                   Lazy execution by default
Cannot cancel standard Promise	   Subscription can be cancelled
Native JavaScript	               RxJS
.then()	                           .subscribe()

Angular HttpClient commonly returns Observables.

7. Arrow functions
const add = (a: number, b: number): number => {
  return a + b;
};


Module 3: Components and data binding 
Component structure
A component consists of:
1. TypeScript class.
2. HTML template.
3. CSS/SCSS styles.
4. Component metadata.

1. Interpolation

Transfers data from component to template.
<h2>{{ employeeName }}</h2>


2. Property binding
<button [disabled]="isLoading">
  Submit
</button>


3. Event binding
<button (click)="saveEmployee()">
  Save
</button>


4. Two-way data binding
<input [(ngModel)]="employeeName">


For standalone components, import FormsModule to use ngModel.
Parent-child communication
Parent component:
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <app-child
      [employeeName]="name"
      (employeeSelected)="onSelected($event)">
    </app-child>
  `
})
export class ParentComponent {
  name = 'Rahul';

  onSelected(id: number) {
    console.log(id);
  }
}


Child component:
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <h3>{{ employeeName }}</h3>
    <button (click)="selectEmployee()">
      Select
    </button>
  `
})
export class ChildComponent {
  @Input() employeeName = '';

  @Output() employeeSelected =
    new EventEmitter<number>();

  selectEmployee() {
    this.employeeSelected.emit(101);
  }
}


Remember:
- @Input() sends data from parent to child.
- @Output() sends events from child to parent.
Angular also supports signal-based inputs and outputs in modern versions, but the candidate should understand the decorator-based approach because it remains common in existing enterprise projects.




Module 3 – Directives and Pipes
1. Structural Directives
Structural directives modify the DOM by adding, removing or repeating elements.

*A. ngIf – Conditional Rendering
<!-- Displays the div only when isLoggedIn is true.
     If false, Angular removes the element from the DOM. -->
<div *ngIf="isLoggedIn">
  Welcome User
</div>


*B. ngFor – Looping Through Data
<!-- Iterates over the employees array.
     employee represents the current object in each iteration.
     employee.name displays the employee's name using interpolation. -->
<div *ngFor="let employee of employees">
  {{ employee.name }}
</div>


C. ngSwitch – Multiple Conditions
<!-- [ngSwitch] checks the value of status.
     *ngSwitchCase matches the specified value.
     *ngSwitchDefault executes when no case matches. -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active</p>
  <p *ngSwitchCase="'inactive'">Inactive</p>
  <p *ngSwitchDefault>Unknown</p>
</div>


2. Attribute Directives
Attribute directives modify the appearance or behavior of existing HTML elements.

A. ngClass – Dynamic CSS Classes
<!-- Applies the 'active' CSS class when isActive is true.
     Removes the class when isActive is false. -->
<p [ngClass]="{'active': isActive}">
  Employee Status
</p>


B. ngStyle – Dynamic Inline Styling
<!-- Applies green color when isActive is true;
     otherwise, applies red color using the ternary operator. -->
<p [ngStyle]="{'color': isActive ? 'green' : 'red'}">
  Status
</p>


Quick Interview Reference
Directive	Purpose
*ngIf	Conditional rendering
*ngFor	Looping through arrays
ngSwitch	Multiple conditions
ngClass	Dynamic CSS classes
ngStyle	Dynamic inline styles



Pipes in Angular
Pipes are used to transform data directly in an Angular template without changing the original value in the component.
1. Uppercase Pipe
Converts a string into uppercase.
<p>{{ employee.name | uppercase }}</p>


Example:
- Input: "abhijit"
- Output: "ABHIJIT"
2. Currency Pipe
Formats a number as currency.
<p>{{ employee.salary | currency:'INR' }}</p>


Example:
- Input: 50000
- Output: ₹50,000.00 (format may vary by locale)
3. Date Pipe
Formats a date into the specified format.
<p>{{ employee.joiningDate | date:'dd/MM/yyyy' }}</p>


Example:
- Input: "2026-11-12"
- Output: "12/11/2026"


Module 5: Services and Dependency Injection 
This is one of the most important concepts in Angular because components should handle UI logic, while services should handle reusable business logic and data operations.
1. What is a Service?
A service is a reusable TypeScript class responsible for handling functionality that can be shared across multiple components.

Common responsibilities include:
- Fetching employee data from APIs.
- Creating, updating and deleting employees.
- Sharing data between components.
- Managing business logic.
- Handling common operations.
Example: Creating an Employee Service
Generate a service using Angular CLI:
ng generate service services/employee


Angular generates a service file, typically employee.service.ts.

employee.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees = [
    { id: 1, name: 'Rahul', salary: 50000 },
    { id: 2, name: 'Amit', salary: 60000 },
    { id: 3, name: 'Priya', salary: 70000 }
  ];

  getEmployees() {
    return this.employees;
  }
}


Understanding each term
Term	Explanation
@Injectable()	Marks the class as available for Angular dependency injection.
providedIn: 'root'	Registers the service with the application-level injector.
export class	Makes the service class available for importing elsewhere.
getEmployees()	A method that returns employee data.

2. What is Dependency Injection (DI)?
Dependency Injection is a design pattern where a class receives the objects or services it depends on instead of creating them itself.

Consider two approaches.

Without Dependency Injection:
export class EmployeeComponent {

  employeeService = new EmployeeService();

}


Here, the component creates the service manually.

Problems:
- Component is tightly coupled to the service implementation.
- Difficult to replace dependencies.
- Testing becomes harder.
With Dependency Injection:
import { Component, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: `<p>Employee Component</p>`
})
export class EmployeeComponent {

  private employeeService = inject(EmployeeService);

}

3. Constructor Injection vs inject()
Angular supports both approaches.

Approach 1: Constructor Injection
import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  template: `<p>Employee Component</p>`
})
export class EmployeeComponent {

  constructor(
    private employeeService: EmployeeService
  ) {}

}


Approach 2: inject()
import { Component, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  template: `<p>Employee Component</p>`
})
export class EmployeeComponent {

  private employeeService = inject(EmployeeService);

}


Both are valid. inject() must be called in an Angular injection context, such as a field initializer or constructor.
4. How to Use a Service in a Component
Let's retrieve employee data from the service and display it.

employee.ts
import { Component, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: `
    <h2>Employee List</h2>

    <ul>
      @for (employee of employees; track employee.id) {
        <li>
          {{ employee.name | uppercase }} - {{ employee.salary | currency:"INR"}}
        </li>
      }
    </ul>
  `
})
export class EmployeeComponent {

  private employeeService = inject(EmployeeService);

  employees = this.employeeService.getEmployees();

}


Output:
Employee List

- Rahul - 50000
- Amit - 60000
- Priya - 70000



Module 6: Angular Routing (45 Minutes)
Angular Routing allows navigation between pages without reloading the entire browser.
1. Configure Routes (app.routes.ts)
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employee-list/employee-list')
        .then(m => m.EmployeeList)
  },
  {
    path: 'employees/create',
    loadComponent: () =>
      import('./employees/employee-form/employee-form')
        .then(m => m.EmployeeForm)
  },
  {
    path: '*',
    loadComponent:<PageNotFound/>
  }
];


2. Register Routes (app.config.ts)
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [provideRouter(routes)]
};


3. RouterLink and RouterOutlet
<a routerLink="/employees">Employees</a>
<a routerLink="/employees/create">Add Employee</a>

<router-outlet></router-outlet>


- RouterLink: Navigates between routes.
- RouterOutlet: Displays the component matching the current route.
For standalone components, import RouterLink and RouterOutlet in the component's imports array.
4. Route Parameters
Used to pass dynamic values through URLs.
{
  path: 'employees/:id',
  component: EmployeeDetails
}



Module 7: REST API Integration and RxJS 
Angular uses HttpClient to communicate with backend REST APIs such as Java Spring Boot microservices.
1. Register HttpClient
In app.config.ts:
import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient()
  ]
};


provideHttpClient() registers Angular's HTTP client so it can be injected into services and components.
2. Create an API Service
Generate a service:
ng generate service services/employee


employee.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, data);
  }

  updateEmployee(id: number, data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, data);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


Important terms:
- HttpClient: Sends HTTP requests.
- Observable: Represents an asynchronous stream of data.
- get(): Retrieves data.
- post(): Creates data.
- put(): Replaces or updates a resource.
- patch(): Partially updates a resource.
- delete(): Deletes a resource.
3. HTTP Methods
Method	Purpose
GET	Retrieve records
POST	Create a record
PUT	Replace/update a resource
PATCH	Partially update a resource
DELETE	Remove a record

4. Consume API in Component
import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  template: `
    <h2>Employee List</h2>

    @if (loading) {
      <p>Loading...</p>
    }

    @if (error) {
      <p>{{ error }}</p>
    }

    @for (employee of employees; track employee.id) {
      <p>{{ employee.name }} - {{ employee.email }}</p>
    }
  `
})
export class EmployeeListComponent implements OnInit {

  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.loading = true;

    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employees = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Unable to load employees';
        this.loading = false;
        console.error(err);
      }
    });
  }
}


5. What is an Observable?
An Observable represents a stream of data that can emit values asynchronously over time.

Angular HttpClient methods return Observables.
this.employeeService.getEmployees().subscribe({
  next: data => console.log(data),
  error: err => console.error(err),
  complete: () => console.log('Completed')
});


- next: Receives emitted data.
- error: Handles errors.
- complete: Executes when the Observable completes.



Module 8: Angular Forms (30 Minutes)
Angular provides two approaches to handle forms:
1. Template-driven forms
2. Reactive forms
1. Template-driven vs Reactive Forms
Template-driven Forms	Reactive Forms
Defined mainly in HTML	Defined mainly in TypeScript
Uses FormsModule	Uses ReactiveFormsModule
Uses ngModel	Uses FormControl and FormGroup
Suitable for simple forms	Suitable for complex forms
Less explicit form model	Explicit form model
Easier initial setup	Better control and scalability

Interview point: Reactive Forms are commonly preferred for complex enterprise applications because they provide better control over validation and form state.
2. Reactive Forms Implementation
employee-form.ts
import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html'
})
export class EmployeeForm {

  private fb = inject(FormBuilder);

  employeeForm = this.fb.group({
    name: ['', Validators.required],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    salary: [0, [
      Validators.required,
      Validators.min(10000)
    ]]
  });

  submit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
  }
}


employee-form.html
<form [formGroup]="employeeForm"
      (ngSubmit)="submit()">

  <input
    placeholder="Employee Name"
    formControlName="name"
  />

  @if (employeeForm.controls.name.touched &&
       employeeForm.controls.name.invalid) {
    <p>Name is required</p>
  }

  <input
    placeholder="Email"
    formControlName="email"
  />

  @if (employeeForm.controls.email.touched &&
       employeeForm.controls.email.invalid) {
    <p>Enter a valid email</p>
  }

  <input
    type="number"
    placeholder="Salary"
    formControlName="salary"
  />

  <button type="submit" [disabled]="employeeForm.invalid">
    Submit
  </button>

</form>