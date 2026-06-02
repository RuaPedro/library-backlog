import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [],
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'explore',
                component: ExploreComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
    
];
