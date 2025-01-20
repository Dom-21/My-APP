import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  imports:[FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  @Input() editIndex: number | null = null; // Index of the recipe being edited
  @Output() formCleared = new EventEmitter<void>(); // Emit event when the form is cleared

  form = { name: '', ingredients: '', description: '', method: '' };
  isEditing = false;

  constructor(private recipeService: RecipeService) {}

  ngOnChanges(): void {
    // Preload the form data if in editing mode
    if (this.editIndex !== null) {
      const recipes = this.recipeService.getRecipes();
      if (recipes && recipes[this.editIndex]) {
        this.form = { ...recipes[this.editIndex] };
        this.isEditing = true;
      }
    }
  }

  saveRecipe() {
    if (this.isEditing && this.editIndex !== null) {
      // Update the existing recipe
      this.recipeService.updateRecipe(this.editIndex, this.form);
    } else {
      // Add a new recipe
      this.recipeService.addRecipe(this.form);
    }
    this.clearForm();
    
  }

  clearForm() {
    // Clear the form and emit the formCleared event
    this.form = { name: '', ingredients: '', description: '', method: '' };
    this.isEditing = false;
    this.formCleared.emit(); // Emit event to parent component
  }
}
