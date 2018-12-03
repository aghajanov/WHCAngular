import { NgbdModalContent } from "./main/modal-component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModalModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppService } from "src/shared/service";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "src/shared/auth-guard.service";
import { DailyChangeEditComponent } from "./daily-change-edit/daily-change-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    NgbdModalContent,
    LoginComponent,
    HomeComponent,
    DailyChangeEditComponent
  ],
  entryComponents: [NgbdModalContent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "home",
        component: HomeComponent
      }
    ])
  ],
  providers: [NgbActiveModal, AppService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
