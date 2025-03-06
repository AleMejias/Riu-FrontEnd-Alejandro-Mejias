import { Routes } from '@angular/router';
import NotRouteFoundComponent from '@ui-components/not-route-found/not-route-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        loadComponent: () => import('./components/heroes/heroes.component').then(( c ) => c.HeroesComponent)
    },
    {
        path: 'heroe/create',
        loadComponent: () => import('./shared/components/heroes-form/heroes-form.component').then(( c ) => c.HeroesFormComponent)
    },
    {
        path: 'heroe/edit/:id',
        loadComponent: () => import('./shared/components/heroes-form/heroes-form.component').then(( c ) => c.HeroesFormComponent)
    },
    {
        path: 'heroe/detail/:id',
        loadComponent: () => import('./components/heroes/heroe-detail/heroe-detail.component')
    },
    {
        path: '**',
        component: NotRouteFoundComponent
    }
];
