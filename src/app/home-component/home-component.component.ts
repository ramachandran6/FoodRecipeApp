import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  incrediantsForm = this.fb.group({
    incrediant: ['']
  })

  constructor(private fb: FormBuilder,private router:Router) { }
  incrediants: Array<string> = []

  goToRecipe() {
    this.router.navigate(['/recipe'])
  }
  
  get incrediant() {
    return this.incrediantsForm.get('incrediant')
  }
  onSubmit() {
    this.incrediants.push(this.incrediantsForm.value.incrediant as string)
  }
}
