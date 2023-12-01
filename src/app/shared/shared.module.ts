import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShowOnScreenWidthDirective } from './directives/show-on-screen-width.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { LoadingDirective } from './directives/loading.directive';
import { AddCardComponent } from './components/add-card/add-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    DialogComponent,
    ShowOnScreenWidthDirective,
    HighlightDirective,
    LoadingDirective,
    AddCardComponent,
  ],
  imports: [
    CommonModule,
    MatDialogActions, 
    MatDialogClose,
    MatDialogContent, 
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [ShowOnScreenWidthDirective, HighlightDirective, LoadingDirective, AddCardComponent]

})
export class SharedModule { }
