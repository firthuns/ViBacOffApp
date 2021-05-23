import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ExploreContainerComponent} from './explore-container/explore-container.component';
import {GuardGuard} from './guards/guard.guard';


const routes: Routes = [

  { path: 'detail', component: ExploreContainerComponent },
  { path: 'tabs', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),     canActivate: [ GuardGuard  ] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'login'  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
