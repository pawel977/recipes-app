import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('test recipe', 'simple text', 'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg'),
    new Recipe('test2 recipe', 'simple text', 'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
    console.log(recipe);
  }

}
