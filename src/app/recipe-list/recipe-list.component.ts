import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports:[CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Subscribe to recipes observable to get real-time updates
    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  addToShoppingList(ingredients: string): void {
    this.recipeService.addToShoppingList(ingredients);
  }

  deleteRecipe(index: number): void {
    this.recipeService.deleteRecipe(index);
  }
}
