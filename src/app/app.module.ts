import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule,
         MatButtonModule,
         MatIconModule,
         MatListModule,
         MatSidenavModule,
         MatMenuModule,
         MatTableModule,
         MatSortModule,
         MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatPaginatorModule,
         MatGridListModule,
         MatStepperModule,
         MatPaginatorIntl } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SheetsComponent } from "./sheets/sheets.component";
import { ConcertsComponent } from "./concerts/concerts.component";
import { PaginatorTranslation } from "./shared/paginatorTranslation";
import { SheetDetailComponent } from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent } from "./concerts/concert-detail/concert-detail.component";
import { SheetStepsComponent } from "./sheets/sheet-steps/sheet-steps.component";
import { AuthComponent } from "./auth/auth.component";
import { ShellComponent } from "./shell/shell.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SheetsComponent,
    ConcertsComponent,
    SheetDetailComponent,
    ConcertDetailComponent,
    SheetStepsComponent,
    AuthComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatStepperModule,
    AppRoutingModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorTranslation }],
  bootstrap: [AppComponent]
})
export class AppModule { }
