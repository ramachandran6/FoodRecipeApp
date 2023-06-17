import { Component,ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeServicesService } from '../recipe-services.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent {
  ingredientsForm = this.fb.group({
    ingredient: ['', Validators.required],
  });

  @ViewChild('ing') ingre: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeServicesService
  ) {}
  ingredients: Array<string> = [];
  ingredientString: string = '';
  filteredRecipes = [];
  goToRecipe() {
    this.router.navigate(['/recipe']);
  }

  get ingredient() {
    return this.ingredientsForm.get('incrediant');
  }

  ngOnInit() {
    this.recipeService
      .getRecipeByIngredients(this.ingredientString)
      .subscribe((data) => (this.filteredRecipes = data as any));
  }
  onSubmit() {
    if ((this.ingredientsForm.value.ingredient as string).length == 0) {
      alert('enter ingredient');
    } else {
      this.ingredients.push(this.ingredientsForm.value.ingredient as string);
      if (this.ingredientString.length > 0) this.ingredientString += ',';
      this.ingredientString += this.ingredientsForm.value.ingredient as string;
      console.log(this.ingredientString);
      this.recipeService
        .getRecipeByIngredients(this.ingredientString)
        .subscribe((data) => (this.filteredRecipes = data as any));
      this.ingre.nativeElement.value = ''
    }
  }

  removeIngredient(inc: string) {
    this.ingredients = this.ingredients.filter((ing) => ing != inc);
    this.ingredientString = '';
    this.ingredients.map((ing) => (this.ingredientString += ing));
    console.log(this.ingredientString);
    this.recipeService
      .getRecipeByIngredients(this.ingredientString)
      .subscribe((data) => (this.filteredRecipes = data as any));
  }

  goToAddRecipe() {
    this.router.navigate(['/addRecipe']);
  }
}
