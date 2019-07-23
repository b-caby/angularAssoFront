import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ConcertsComponent } from "./concerts/concerts.component";
import { SheetsComponent } from "./sheets/sheets.component";
import { SheetDetailComponent } from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent } from "./concerts/concert-detail/concert-detail.component";
import { SheetStepsComponent } from "./sheets/sheet-steps/sheet-steps.component";
import { AuthComponent } from "./auth/auth.component";
import { ShellComponent } from "./shell/shell.component";
import { AuthGuard } from "./shared/authGuard";

const routes: Routes = [
  { path: "", component: ShellComponent, children: [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "sheets", component: SheetsComponent, canActivate: [AuthGuard] },
    { path: "sheets/steps", component: SheetStepsComponent, canActivate: [AuthGuard] },
    { path: "sheets/steps/:id", component: SheetStepsComponent, canActivate: [AuthGuard] },
    { path: "sheets/:id", component: SheetDetailComponent, canActivate: [AuthGuard] },
    { path: "concerts", component: ConcertsComponent, canActivate: [AuthGuard] },
    { path: "concerts/:id", component: ConcertDetailComponent, canActivate: [AuthGuard] }
  ]},
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
