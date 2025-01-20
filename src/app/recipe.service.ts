import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesKey = 'recipes';
  private shoppingListKey = 'shoppingList';

  // BehaviorSubjects to hold recipes and shopping list data
  private recipesSubject = new BehaviorSubject<any[]>(this.getRecipes());
  private shoppingListSubject = new BehaviorSubject<string[]>(this.getShoppingList());

  // Expose the data as Observables
  recipes$ = this.recipesSubject.asObservable();
  shoppingList$ = this.shoppingListSubject.asObservable();

  constructor() {
    // Initialize localStorage if not already present
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(this.recipesKey)) {
        localStorage.setItem(this.recipesKey, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.shoppingListKey)) {
        localStorage.setItem(this.shoppingListKey, JSON.stringify([]));
      }
    }
  }

  // Get recipes from local storage
  getRecipes(): any[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(this.recipesKey) || '[]');
    }
    return [];
  }

  // Get shopping list from local storage
  getShoppingList(): string[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(this.shoppingListKey) || '[]');
    }
    return [];
  }

  // Add a new recipe
  addRecipe(recipe: any): void {
    if (typeof window !== 'undefined') {
      const recipes = this.getRecipes();
      recipes.push(recipe);
      this.saveToLocalStorage(this.recipesKey, recipes);
      this.recipesSubject.next(recipes); // Emit updated recipes list
    }
  }

  // Update a recipe by index
  updateRecipe(index: number, recipe: any): void {
    if (typeof window !== 'undefined') {
      const recipes = this.getRecipes();
      if (recipes[index]) {
        recipes[index] = recipe;
        this.saveToLocalStorage(this.recipesKey, recipes);
        this.recipesSubject.next(recipes); // Emit updated recipes list
      }
    }
  }

  // Delete a recipe by index
  deleteRecipe(index: number): void {
    if (typeof window !== 'undefined') {
      const recipes = this.getRecipes();
      if (recipes[index]) {
        recipes.splice(index, 1);
        this.saveToLocalStorage(this.recipesKey, recipes);
        this.recipesSubject.next(recipes); // Emit updated recipes list
      }
    }
  }

  // Add ingredients to the shopping list
  addToShoppingList(ingredients: string): void {
    if (typeof window !== 'undefined') {
      const items = ingredients.split(',').map(i => i.trim());
      const shoppingList = this.getShoppingList();
      shoppingList.push(...items);
      this.saveToLocalStorage(this.shoppingListKey, shoppingList);
      this.shoppingListSubject.next(shoppingList); // Emit updated shopping list
    }
  }

  // Clear the shopping list
  clearShoppingList(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.shoppingListKey, JSON.stringify([]));
      this.shoppingListSubject.next([]); // Emit cleared shopping list
    }
  }

  // Save data to local storage
  private saveToLocalStorage(key: string, data: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
}
