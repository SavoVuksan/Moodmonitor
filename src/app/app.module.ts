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
import { SearchComponent } from './components/search/search.component';
import { SearchEntryListComponent } from './components/search-entry-list/search-entry-list.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LoginComponent } from './components/login//login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth/auth.guard';
import {DataGuard} from './auth/data.guard';

const appRoutes : Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'writeMood', component : WriteMoodComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'entryList', component: EntryListComponent, canActivate: [AuthGuard]},
  {path: 'readMood', component: ReadMoodComponent, canActivate: [AuthGuard, DataGuard]}
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
    RegisterComponent,
    SearchComponent,
    SearchEntryListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false}
    ),
    HttpClientModule,
    FileSaverModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
