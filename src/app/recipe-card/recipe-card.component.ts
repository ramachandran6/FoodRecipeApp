import { Component, Input } from '@angular/core';
import { RecipeServicesService } from '../recipe-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent {
  @Input() recipe = {
    id: '',
    title: 'cool',
    img:'',
    desc: 'abc',
    ingredients: ['a', 'b', 'c'],
  };

  constructor(
    private recipeService: RecipeServicesService,
    private router: Router
  ) {}

  recipeInfo() {
    // console.log(this.recipe.id);
    this.router.navigate([`recipe/${this.recipe.id as string}`])
  }
  addToFav() {
    // console.log(this.recipe.id)
    this.recipeService.addFav(this.recipe.id as string);
  }
}
