import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  //lazy load module
  {
    path: 'training',
    loadChildren: () => import('./training/training.module')
    .then(m => m.TrainingModule),
    canLoad: [AuthGuard] //canLoad verifica se temos acesso mesmo antes de carregar o módulo
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
