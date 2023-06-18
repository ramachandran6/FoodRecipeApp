import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  constructor(private http: HttpClient) { }
  recipes:any = []
  ngOnInit() {
    this.http
      .get('https://648a952b17f1536d65e94f02.mockapi.io/recipe')
      .pipe(catchError((err) => []))
      .subscribe((data)=> this.recipes = data)
  }
}
