import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componets/header/header.component';
import { FooterComponent } from './Componets/footer/footer.component';
import { HomePageComponent } from './Componets/home-page/home-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.modile';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { AboutComponent } from './Componets/about/about.component';
import { QualificationComponent } from './Componets/qualification/qualification.component';
import { ResearchComponent } from './Componets/research/research.component';
import { ExperienceComponent } from './Componets/experience/experience.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { LanguagesComponent } from './Componets/languages/languages.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './Services/Storage/local-storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProjectsComponent } from './Componets/projects/projects.component';
import { MatChipsModule } from '@angular/material/chips';
import { LivetextComponent } from './Componets/livetext/livetext.component';
import { ModalsComponent } from './Componets/modals/modals.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { SampleProjectsComponent } from './sample-projects/sample-projects.component';
// import { MatSidenav } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AboutComponent,
    QualificationComponent,
    ResearchComponent,
    ExperienceComponent,
    LanguagesComponent,
    ProjectsComponent,
    LivetextComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
