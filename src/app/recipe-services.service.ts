import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap } from 'rxjs';
import { recipeTemp } from './add-recipe/add-recipe.component';

@Injectable({
  providedIn: 'root',
})
export class RecipeServicesService {
  constructor(private http: HttpClient) {}
  favRecipe: Array<recipeTemp> = [];
  obj: recipeTemp = {
    title: '',
    img: '',
    desc: '',
    ingredients: [],
  };
  favObj: recipeTemp = {
    title: '',
    img: '',
    desc: '',
    ingredients: [],
  };
  addFav(id: string) {
    this.http
      .get<recipeTemp>(
        `https://648a952b17f1536d65e94f02.mockapi.io/recipe/${id}`
      )
      .subscribe((val) => {
        this.obj = val;
        this.favObj = val;
        // console.log(this.obj)
        this.http
          .post<recipeTemp>(
            'https://648a952b17f1536d65e94f02.mockapi.io/favorites',
            this.obj
          )
          .subscribe((val) => console.log(val));
        // console.log(this.favObj)
      });
    // this.favObj = {
    //   title : this.obj.title,
    //     desc : this.obj.desc,
    //     img : this.obj.img,
    //     ingredients:this.obj.ingredients
    // }
    // console.log(this.favObj)
    // this.http.post<recipeTemp>('https://648a952b17f1536d65e94f02.mockapi.io/favorites',this.obj).subscribe((val)=> console.log(val))
  }
  getFav() {
    return this.http.get(
      'https://648a952b17f1536d65e94f02.mockapi.io/favorites'
    );
  }
  getRecipeByIngredients(ingredients: string) {
    return this.http.get(
      `https://648a952b17f1536d65e94f02.mockapi.io/recipe?ingredients=${ingredients}`
    );
  }



  getRecipeById(id: string) {
    return this.http
      .get<recipeTemp>(
        `https://648a952b17f1536d65e94f02.mockapi.io/recipe/${id}`
      )
      .pipe(catchError((err) => []));
  }

  // deleteRecipe(id: string) {
  //   return this.http
  //     .delete(`https://648a952b17f1536d65e94f02.mockapi.io/recipe/${id}`)
  //     .pipe(catchError((err) => []));
  // }
}
