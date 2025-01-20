import { Component } from '@angular/core';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  imports: [RecipeFormComponent, RecipeListComponent, ShoppingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
}
