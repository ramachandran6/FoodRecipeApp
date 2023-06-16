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

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'recipe', component: AddRecipeComponent },
  { path: 'recipe/:id', component: ViewRecipeComponent },
  {path:'favorites',component:FavComponentComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    AddRecipeComponent,
    RecipeCardComponent,
    ViewRecipeComponent,
    FavComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
