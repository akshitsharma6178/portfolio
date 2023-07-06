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
  {path: 'about', component: AboutComponent,  },
  {path: 'qualification', component: QualificationComponent},
  {path: 'experience', component: ExperienceComponent},
  {path: 'research', component: ResearchComponent},
  {path: 'language', component: LanguagesComponent},
  // {path: 'sample', component: SampleProjectsComponent, data:{animation: 'samplePage'}},
  {path: 'project', component: ProjectsComponent},
  {path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
