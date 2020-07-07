

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [

        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDividerModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonToggleModule,
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDividerModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonToggleModule,
    ]
})
export class MaterialModule { }

