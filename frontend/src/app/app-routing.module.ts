import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { EventComponent } from './components/event/event.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EditEventGuard } from './guards/edit-event.guard';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  // { path: 'event/:id', component: EventComponent },
  {
    path: 'edit-event/:id',
    component: EditEventComponent,
    canActivate: [EditEventGuard],
  },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'event/:id', component: EventDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
