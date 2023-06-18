import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServicesService } from '../recipe-services.service';
import { recipeTemp } from '../add-recipe/add-recipe.component';
import { catchError, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fav-component',
  templateUrl: './fav-component.component.html',
  styleUrls: ['./fav-component.component.css'],
})
export class FavComponentComponent {
  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeServicesService,
    private route: Router,
    private http:HttpClient
  ) {}
  noFav: boolean = true;
  // recipeList: recipeTemp = {
  //   title: '',
  //   img: '',
  //   desc: '',
  //   ingredients: [],
  // };
  favRecipes: any;
  ngOnInit() {
    if (this.noFav) {
      this.noFav = !this.noFav;
    }
    if (this.noFav && this.favRecipes.length == 0) {
      this.noFav = true;
    }
    this.router.paramMap.subscribe((route) => {
      const id = route.get('id') as string;

      // console.log(id)
      this.recipeService.getFav().subscribe((data) => {
        this.favRecipes = data as any;
      });
    });
  }

  recipeInfo(id: string) {
    // console.log(this.recipe.id);
    this.route.navigate([`recipe/${id}`]);
  }

  delete(i: number) {
    this.http
      .delete(`https://648a952b17f1536d65e94f02.mockapi.io/favorites/${this.favRecipes[i].id}`)
      .pipe(
        concatMap(() => this.recipeService.getFav()),
        catchError((err) => [])
      )
      .subscribe((val) => this.favRecipes = val);
  }
}
