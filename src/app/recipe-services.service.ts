import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { recipeTemp } from './add-recipe/add-recipe.component';

@Injectable({
  providedIn: 'root',
})
export class RecipeServicesService {
  constructor(private http: HttpClient) {}
  favRecipe:Array<recipeTemp> = [];
  addFav(id: string) {
    this.http
      .get<recipeTemp>(`https://648a952b17f1536d65e94f02.mockapi.io/recipe/${id}`)
      .subscribe((val) => {
        this.favRecipe.push(val);
      });
  }

  getRecipeById(id: string) {
    return this.http
      .get<recipeTemp>(
        `https://648a952b17f1536d65e94f02.mockapi.io/recipe/${id}`
      )
      .pipe(catchError((err) => []));
  }
}
