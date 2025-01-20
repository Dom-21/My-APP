import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-shopping-list',
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: string[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Fetch the shopping list from the service when the component is initialized
    this.shoppingList = this.recipeService.getShoppingList();
  }

  clearShoppingList(): void {
    // Clear the shopping list using the service
    this.recipeService.clearShoppingList();
    // After clearing, update the local shopping list to reflect changes
    this.shoppingList = this.recipeService.getShoppingList();
  }
}
