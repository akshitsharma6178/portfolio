import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Componets/about/about.component';
import { ExperienceComponent } from './Componets/experience/experience.component';
import { HomePageComponent } from './Componets/home-page/home-page.component';
import { LanguagesComponent } from './Componets/languages/languages.component';
import { ProjectsComponent } from './Componets/projects/projects.component';
import { QualificationComponent } from './Componets/qualification/qualification.component';
import { ResearchComponent } from './Componets/research/research.component';
// import { SampleProjectsComponent } from './Componets/sample-projects/sample-projects.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent, data:{animation: 'aboutPage'}},
  {path: 'qualification', component: QualificationComponent, data:{animation: 'qualificationPage'}},
  {path: 'experience', component: ExperienceComponent, data:{animation: 'experiencePage'}},
  {path: 'research', component: ResearchComponent, data:{animation: 'aboutPage'}},
  {path: 'language', component: LanguagesComponent, data:{animation: 'languagePage'}},
  // {path: 'sample', component: SampleProjectsComponent, data:{animation: 'samplePage'}},
  {path: 'project', component: ProjectsComponent, data:{animation: 'projectPage'}},
  {path: '**', component: HomePageComponent, data:{animation: 'homePage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
