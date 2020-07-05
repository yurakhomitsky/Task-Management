import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  },

  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
