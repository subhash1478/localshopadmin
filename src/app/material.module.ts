import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {MatButtonModule, MatCheckboxModule,
  MatToolbarModule, MatChipsModule, MatOptionModule,
   MatProgressBarModule, MatSliderModule, MatSlideToggleModule,
   MatMenuModule, MatDialogModule, MatSnackBarModule,
     MatInputModule, MatSidenavModule, MatCardModule, MatIconModule,
      MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [  MatPaginatorModule,  MatTableModule,
     MatFormFieldModule, MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule,
     MatChipsModule, MatOptionModule, MatGridListModule,
      MatProgressBarModule, MatSliderModule, MatSlideToggleModule,
      MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
      MatCardModule, MatIconModule, MatRadioModule,
       MatProgressSpinnerModule, MatTabsModule, MatListModule
  ],
  exports: [ MatTableModule, MatPaginatorModule, MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule,
     MatOptionModule,  MatProgressBarModule, MatSliderModule,
      MatSlideToggleModule, MatMenuModule, MatDialogModule,
      MatSnackBarModule, MatSelectModule, MatInputModule,
      MatSidenavModule,   MatIconModule, MatRadioModule,
       MatProgressSpinnerModule, MatTabsModule, MatListModule, MatGridListModule, MatFormFieldModule, MatCardModule],
  })
  export class MaterialModule { }
