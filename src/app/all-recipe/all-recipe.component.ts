import { HttpClient} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-all-recipe',
  templateUrl: './all-recipe.component.html',
  styleUrls: ['./all-recipe.component.css'],
})
export class AllRecipeComponent {

  @Input() recipes: any
  constructor(private http: HttpClient) {}
  ngOnInit() {
    // this.recipeList$ = ;
    this.getRecipes().subscribe((val: any) => {
      this.recipeList = val;
      console.log(val);
    });
  }
  recipeList = [];

  getRecipes() {
    return this.http
      .get('https://648a952b17f1536d65e94f02.mockapi.io/recipe')
      .pipe(catchError((err) => []));
  }
}
