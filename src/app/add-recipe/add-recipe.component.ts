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
  cookingTime: string;
  preparationSteps: Array<string>;
  servingSize: string;
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
    cookingTime: ['', Validators.required],
    servingSize: ['', Validators.required],
  });

  ngOnInit() {
    // this.recipeList$ = ;
    this.getRecipes().subscribe((val: any) => {
      this.recipeList = val;
      console.log(val);
    });
  }

  // @ViewChild('tit') tit: any;
  // @ViewChild('des') des: any;
  // @ViewChild('imag') imag: any;
  @ViewChild('ing') ing: any;
  // @ViewChild('cookingTime') cookTime: any;
  @ViewChild('prepStep') prepStep: any;
  // @ViewChild('servingSize') servSize: any;

  ingredientsForm = this.fb.group({
    ingredient: ['', Validators.required],
  });

  preparationStepsForm = this.fb.group({
    step: ['', Validators.required],
  });

  incs: Array<string> = [];
  preparationSteps: Array<string> = [];
  obj: recipeTemp = {
    title: '',
    img: '',
    desc: '',
    ingredients: [],
    cookingTime: '',
    preparationSteps: [],
    servingSize: '',
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
  get cookingTime() {
    return this.ingredientsForm.get('cookingTime');
  }
  get step() {
    return this.preparationStepsForm.get('step');
  }
  get servingSize() {
    return this.ingredientsForm.get('servingSize');
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
        cookingTime: this.recipeForm.value.cookingTime as any,
        preparationSteps: this.preparationSteps as any,
        servingSize: this.recipeForm.value.servingSize as any,
      };
      this.recipes.push(this.obj as any);
      console.log(this.recipes);
      this.http
        .post('https://648a952b17f1536d65e94f02.mockapi.io/recipe', this.obj)
        .pipe(concatMap(() => this.getRecipes()))
        .subscribe((val) => (this.recipeList = val as any));
      alert('recipe added succesfully');
      // this.tit.nativeElement.value = '';
      // this.des.nativeElement.value = '';
      // this.imag.nativeElement.value = '';
      // this.cookTime.nativeElement.value = '';
      // this.prepSteps.nativeElement.value = '';
      // this.servSize.nativeElement.value = '';
      this.recipeForm.reset();
      this.ingredientsForm.reset();
      this.preparationStepsForm.reset();
      this.router.navigate(['/recipes']);
    } else {
      alert('Fill all details');
    }
  }
  onSubmitInc() {
    if ((this.ingredientsForm.value.ingredient as string).length == 0) {
      alert('add ingredient');
    } else {
      this.incs.push(this.ingredientsForm.value.ingredient as string);
      this.ing.nativeElement.value = '';
    }
  }
  removeIng(inc: string) {
    this.incs = this.incs.filter((ing) => ing !== inc);
  }
  onSubmitSteps() {
    if ((this.preparationStepsForm.value.step as string).length == 0) {
      alert('add steps');
    } else {
      this.preparationSteps.push(
        this.preparationStepsForm.value.step as string
      );
      this.prepStep.nativeElement.value = '';
    }
  }
  removeSteps(step: string) {
    this.preparationSteps = this.preparationSteps.filter((ste) => ste !== step);
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
