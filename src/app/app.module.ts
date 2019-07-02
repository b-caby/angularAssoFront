import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
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
         MatPaginatorIntl } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SheetsComponent } from "./sheets/sheets.component";
import { ConcertsComponent } from "./concerts/concerts.component";
import PaginatorTranslation from "./shared/paginatorTranslation";
import { SheetDetailComponent } from "./sheets/sheet-detail/sheet-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SheetsComponent,
    ConcertsComponent,
    SheetDetailComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
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
    AppRoutingModule
  ],
  providers: [ { provide: MatPaginatorIntl, useClass: PaginatorTranslation}],
  bootstrap: [AppComponent]
})
export class AppModule { }
