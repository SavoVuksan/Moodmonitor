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
import { CalendarComponent } from './components/calendar/calendar.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { ReadMoodComponent } from './components/read-mood/read-mood.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LoginComponent } from './components/login//login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes : Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard' , component: DashboardComponent},
  {path: 'writeMood', component : WriteMoodComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'entryList', component: EntryListComponent},
  {path: 'readMood', component: ReadMoodComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WriteMoodComponent,
    NavigationComponent,
    ClickOutsideDirective,
    EmotionListComponent,
    CalendarComponent,
    EntryListComponent,
    ReadMoodComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false}
    ),
    HttpClientModule,
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
