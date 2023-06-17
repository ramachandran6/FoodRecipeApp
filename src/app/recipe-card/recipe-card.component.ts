import { Component, Input } from '@angular/core';
import { RecipeServicesService } from '../recipe-services.service';
import { Router } from '@angular/router';
import { recipeTemp } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent {
  @Input() recipes: Array<any> = [];
  showDesc:boolean = false;
  toggleDesc() {
    this.showDesc = !this.showDesc;
  }
  constructor(
    private recipeService: RecipeServicesService,
    private router: Router
  ) {}

  recipeInfo(id: string) {
    // console.log(this.recipe.id);
    this.router.navigate([`recipe/${id}`]);
  }
  addToFav(id: string) {
    // console.log(this.recipe.id)
    this.recipeService.addFav(id);
    alert('dish added successfully');
  }
}
