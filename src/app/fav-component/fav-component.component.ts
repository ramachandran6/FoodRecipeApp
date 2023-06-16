import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServicesService } from '../recipe-services.service';
import { recipeTemp } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-fav-component',
  templateUrl: './fav-component.component.html',
  styleUrls: ['./fav-component.component.css'],
})
export class FavComponentComponent {
  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeServicesService,
    private route: Router
  ) {}

  // recipeList: recipeTemp = {
  //   title: '',
  //   img: '',
  //   desc: '',
  //   ingredients: [],
  // };
  favRecipes: Array<recipeTemp> = this.recipeService.favRecipe;
  ngOnInit() {
    this.router.paramMap.subscribe((route) => {
      const id = route.get('id') as string;
      
      // console.log(id)
      this.recipeService.getRecipeById(id as string).subscribe((data) => {
        this.favRecipes.push(data);
      });
    });
  }
}
