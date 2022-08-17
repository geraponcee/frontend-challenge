import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MembersComponent } from './components/members/members.component'; 

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'members', component: MembersComponent },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
