import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ConcertsComponent } from "./concerts/concerts.component";
import { SheetsComponent } from "./sheets/sheets.component";
import { SheetDetailComponent } from "./sheets/sheet-detail/sheet-detail.component";
import { ConcertDetailComponent } from "./concerts/concert-detail/concert-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "sheets", component: SheetsComponent },
  { path: "sheets/:id", component: SheetDetailComponent },
  { path: "concerts", component: ConcertsComponent },
  { path: "concerts/:id", component: ConcertDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
