import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 private recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'test recipe',
      'simple text',
      'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
      [
        new Ingredient('potato', 2),
        new Ingredient('tomato', 2)
      ]),
    
      new Recipe(
      'test2 recipe',
      'simple text',
      'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
      [
        new Ingredient('oil', 1),
        new Ingredient('cheese', 3),
        new Ingredient('bread', 5),
        new Ingredient('pork', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
