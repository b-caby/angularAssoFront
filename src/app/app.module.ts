import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
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
         MatProgressSpinnerModule,
         MatPaginatorIntl } from "@angular/material";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SheetsComponent } from "./sheets/sheets.component";
import { ConcertsComponent } from "./concerts/concerts.component";
import { SheetDetailComponent } from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent } from "./concerts/concert-detail/concert-detail.component";
import { SheetStepsComponent } from "./sheets/sheet-steps/sheet-steps.component";
import { AuthComponent } from "./auth/auth.component";
import { ShellComponent } from "./shell/shell.component";
import { LoaderComponent } from "./loader/loader.component";

import { ApiInterceptor } from "./shared/apiInterceptor";
import { PaginatorTranslation } from "./shared/paginatorTranslation";
import { ErrorInterceptor } from "./shared/errorInterceptor";

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
    ShellComponent,
    LoaderComponent
  ],
  imports: [
    HttpClientModule,
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
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorTranslation },
              { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
