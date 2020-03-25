import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserModule }                                  from "@angular/platform-browser";
import { NgModule, LOCALE_ID }                            from "@angular/core";
import { BrowserAnimationsModule }                        from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule }               from "@angular/forms";
import { FlexLayoutModule }                               from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS }            from "@angular/common/http";
import { AppRoutingModule }                               from "./app-routing.module";
import { MatMomentDateModule, MomentDateAdapter }         from "@angular/material-moment-adapter";
import { registerLocaleData }                             from "@angular/common";
import localeFr                                           from "@angular/common/locales/fr";

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
         MatRippleModule,
         MatPaginatorIntl } from "@angular/material";

import { AppComponent }           from "./app.component";
/* AUTH COMPONENTS */
import { AuthComponent }          from "./auth/auth.component";
import { AuthErrorComponent }     from "./auth/auth-error.component";

import { HomeComponent }             from "./home/home.component";
import { SheetsComponent }           from "./sheets/sheets.component";
import { ConcertsComponent }         from "./concerts/concerts.component";
import { SheetDetailComponent }      from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent }    from "./concerts/concert-detail/concert-detail.component";
import { SheetStepsComponent }       from "./sheets/sheet-steps/sheet-steps.component";
import { ShellComponent }            from "./shell/shell.component";
import { LoaderComponent }           from "./components/loader/loader.component";
import { DeleteDialogComponent }     from "./components/delete-dialog/delete-dialog.component";
import { ConcertStepsComponent }     from "./concerts/concert-steps/concert-steps.component";
import { ErrorHandlerComponent }     from "./components/error-handler/error-handler.component";
import { ApiInterceptor }            from "./shared/apiInterceptor";
import { PaginatorTranslation }      from "./shared/paginatorTranslation";
import { ErrorInterceptor }          from "./shared/errorInterceptor";
import { ErrorSnackbarComponent }    from "./components/error-snackbar/error-snackbar.component";
import { AccountComponent }          from "./users/account/account.component";
import { BenefactorsComponent }      from "./benefactors/benefactors.component";
import { BenefactorDetailComponent } from "./benefactors/benefactor-detail/benefactor-detail.component";
import { UsersComponent }            from "./users/users.component";
import { UserDetailComponent }       from "./users/user-detail/user-detail.component";

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

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthErrorComponent,
    HomeComponent,
    SheetsComponent,
    ConcertsComponent,
    SheetDetailComponent,
    ConcertDetailComponent,
    SheetStepsComponent,
    ShellComponent,
    LoaderComponent,
    DeleteDialogComponent,
    ConcertStepsComponent,
    ErrorHandlerComponent,
    ErrorSnackbarComponent,
    AccountComponent,
    BenefactorsComponent,
    BenefactorDetailComponent,
    UsersComponent,
    UserDetailComponent
  ],
  entryComponents: [
    AuthErrorComponent,
    DeleteDialogComponent,
    ErrorSnackbarComponent],
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
    MatRippleModule,
    AppRoutingModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorTranslation },
              { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
              { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
              { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
              { provide: LOCALE_ID, useValue: "fr-FR" },
              { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
