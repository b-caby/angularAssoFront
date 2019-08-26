import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserModule }                                  from "@angular/platform-browser";
import { NgModule }                                       from "@angular/core";
import { BrowserAnimationsModule }                        from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule }               from "@angular/forms";
import { FlexLayoutModule }                               from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS }            from "@angular/common/http";
import { AppRoutingModule }                               from "./app-routing.module";
import { MatMomentDateModule, MomentDateAdapter }         from "@angular/material-moment-adapter";

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
         MatDialogModule,
         MatProgressSpinnerModule,
         MatDatepickerModule,
         MatSnackBarModule,
         MatPaginatorIntl } from "@angular/material";

import { AppComponent }           from "./app.component";
import { HomeComponent }          from "./home/home.component";
import { SheetsComponent }        from "./sheets/sheets.component";
import { ConcertsComponent }      from "./concerts/concerts.component";
import { SheetDetailComponent }   from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent } from "./concerts/concert-detail/concert-detail.component";
import { SheetStepsComponent }    from "./sheets/sheet-steps/sheet-steps.component";
import { AuthComponent }          from "./auth/auth.component";
import { ShellComponent }         from "./shell/shell.component";
import { LoaderComponent }        from "./components/loader/loader.component";
import { DeleteDialogComponent }  from "./components/delete-dialog/delete-dialog.component";
import { ConcertStepsComponent }  from "./concerts/concert-steps/concert-steps.component";
import { ErrorHandlerComponent }  from "./components/error-handler/error-handler.component";
import { ApiInterceptor }         from "./shared/apiInterceptor";
import { PaginatorTranslation }   from "./shared/paginatorTranslation";
import { ErrorInterceptor }       from "./shared/errorInterceptor";
import { ErrorSnackbarComponent } from "./components/error-snackbar/error-snackbar.component";

const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

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
    LoaderComponent,
    DeleteDialogComponent,
    ConcertStepsComponent,
    ErrorHandlerComponent,
    ErrorSnackbarComponent
  ],
  entryComponents: [DeleteDialogComponent, ErrorSnackbarComponent],
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
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorTranslation },
              { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
              { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
              { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
              { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
