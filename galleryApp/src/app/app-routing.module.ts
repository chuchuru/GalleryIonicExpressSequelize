import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'my-artists',
    loadChildren: () => import('./my-artists/my-artists.module').then( m => m.MyArtistsPageModule)
  },
  {
    path: 'my-pictures',
    loadChildren: () => import('./my-pictures/my-pictures.module').then( m => m.MyPicturesPageModule)
  },
  {
    path: 'my-galleries',
    loadChildren: () => import('./my-galleries/my-galleries.module').then( m => m.MyGalleriesPageModule)
  },
  {
    path: 'my-users',
    loadChildren: () => import('./my-users/my-users.module').then( m => m.MyUsersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
