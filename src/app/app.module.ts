import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WriteMoodComponent } from './components/write-mood/write-mood.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { EmotionListComponent } from './components/emotion-list/emotion-list.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes : Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard' , component: DashboardComponent},
  {path: 'writeMood', component : WriteMoodComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WriteMoodComponent,
    NavigationComponent,
    ClickOutsideDirective,
    EmotionListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false}
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
