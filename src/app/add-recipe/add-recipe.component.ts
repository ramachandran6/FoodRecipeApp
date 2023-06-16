import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap } from 'rxjs';
import { Router } from '@angular/router';

export type recipeTemp = {
  title: string,
  img:string,
  desc: string,
  ingredients: Array<string>
};

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent {
  recipeForm = this.fb.group({
    title: [''],
    img:[''],
    desc: [''],

  });
  ngOnInit() {
    // this.recipeList$ = ;
    this.getRecipes().subscribe((val: any) => {
      this.recipeList = val;
      console.log(val);
    });
  }

  incrediantsForm = this.fb.group({
    incrediant: [''],
  });

  incs: Array<string> = [];
  obj: recipeTemp = {
    title: '',
    img:'',
    desc: '',
    ingredients: [],
  };

  goToFavo() {
    this.router.navigate(['/favorites'])
  }
  onSubmitRec() {
    this.obj = {
      title: this.recipeForm.value.title as any,
      img : this.recipeForm.value.img as any,
      desc: this.recipeForm.value.desc as any,
      ingredients: this.incs,
    };
    this.recipes.push(this.obj as any);
    console.log(this.recipes);
    this.http.post('https://648a952b17f1536d65e94f02.mockapi.io/recipe', this.obj)
        .pipe(concatMap(()=>this.getRecipes())).subscribe((val) => this.recipeList = val as any)
  }
  onSubmitInc() {
    this.incs.push(this.incrediantsForm.value.incrediant as string);
  }
  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {}
  recipes = [
    {
      title: 'A very nice Vegan dish',
      desc: 'A beautiful description of the recipe',
      ingredients: ['list', 'of', 'ingredients'],
    },
  ];

  recipeList = [];
  
  getRecipes() {
    return this.http
      .get('https://648a952b17f1536d65e94f02.mockapi.io/recipe')
      .pipe(catchError((err) => []));
  }
}
