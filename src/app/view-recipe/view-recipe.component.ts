import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServicesService } from '../recipe-services.service';
import { recipeTemp } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css'],
})
export class ViewRecipeComponent {
  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeServicesService,
    private route: Router
  ) {}

  recipeList: recipeTemp = {
    title: '',
    img: '',
    desc: '',
    ingredients: [],
    cookingTime: '',
    preparationSteps: [],
    servingSize: '',
  };

  ngOnInit() {
    this.router.paramMap.subscribe((route) => {
      const id = route.get('id') as string;
      // console.log(id)
      this.recipeService.getRecipeById(id as string).subscribe((data) => {
        this.recipeList = data;
      });
    });
  }

  goBack() {
    this.route.navigate(['/recipe']);
  }
}
