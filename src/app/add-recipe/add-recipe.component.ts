import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap } from 'rxjs';
import { Router } from '@angular/router';

export type recipeTemp = {
  title: string;
  img: string;
  desc: string;
  ingredients: Array<string>;
};

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent {
  recipeForm = this.fb.group({
    title: ['', Validators.required],
    img: ['', [Validators.required, Validators.pattern('^(http|https).*')]],
    desc: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit() {
    // this.recipeList$ = ;
    this.getRecipes().subscribe((val: any) => {
      this.recipeList = val;
      console.log(val);
    });
  }
  @ViewChild('tit') tit: any;
  @ViewChild('des') des: any;
  @ViewChild('imag') imag: any;
  @ViewChild('ing') ing: any;

  ingredientsForm = this.fb.group({
    ingredient: ['', Validators.required],
  });

  incs: Array<string> = [];
  obj: recipeTemp = {
    title: '',
    img: '',
    desc: '',
    ingredients: [],
  };

  get title() {
    return this.recipeForm.get('title');
  }
  get img() {
    return this.recipeForm.get('img');
  }
  get desc() {
    return this.recipeForm.get('desc');
  }
  get Ingredients() {
    return this.ingredientsForm.get('ingredient');
  }
  goToFavo() {
    this.router.navigate(['/favorites']);
  }
  onSubmitRec() {
    if (this.recipeForm.valid) {
      this.obj = {
        title: this.recipeForm.value.title as any,
        img: this.recipeForm.value.img as any,
        desc: this.recipeForm.value.desc as any,
        ingredients: this.incs,
      };
      this.recipes.push(this.obj as any);
      console.log(this.recipes);
      this.http
        .post('https://648a952b17f1536d65e94f02.mockapi.io/recipe', this.obj)
        .pipe(concatMap(() => this.getRecipes()))
        .subscribe((val) => (this.recipeList = val as any));
      alert('recipe added succesfully');
      this.tit.nativeElement.value = '';
      this.des.nativeElement.value = '';
      this.imag.nativeElement.value = '';
      this.router.navigate(['']);
    } else {
      alert('Fill all details');
    }
  }
  onSubmitInc() {
    if ((this.ingredientsForm.value.ingredient as string).length == 0) {
      alert('add ingredient')
    }
    else {
      this.incs.push(this.ingredientsForm.value.ingredient as string);
      this.ing.nativeElement.value = '';
    }
    
  }
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
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
