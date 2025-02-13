import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { EventComponent } from './components/event/event.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    EventComponent,
    LoginComponent,
    RegisterComponent,
    EditEventComponent,
    MenuComponent,
    CreateEventComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
