import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { FavComponentComponent } from './fav-component/fav-component.component';
import { AllRecipeComponent } from './all-recipe/all-recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'addRecipe', component: AddRecipeComponent },
  { path: 'recipe/:id', component: ViewRecipeComponent },
  { path: 'favorites', component: FavComponentComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    AddRecipeComponent,
    RecipeCardComponent,
    ViewRecipeComponent,
    FavComponentComponent,
    AllRecipeComponent,
    NavbarComponent,
    RecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
