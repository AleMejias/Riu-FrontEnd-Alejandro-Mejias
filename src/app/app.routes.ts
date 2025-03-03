import { Routes } from '@angular/router';
import NotRouteFoundComponent from '@ui-components/not-route-found/not-route-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {
        path: 'heroes', //Listado de heroes
        loadComponent: () => import('./components/heroes/heroes.component').then(( c ) => c.HeroesComponent)
    },
    {
        path: 'heroe/create', //Pantalla para creacion de un heroe
        loadComponent: () => import('./shared/components/heroes-form/heroes-form.component').then(( c ) => c.HeroesFormComponent)
    },
    {
        path: 'heroe/edit/:id', //Pantalla para edicion de un heroe
        loadComponent: () => import('./shared/components/heroes-form/heroes-form.component').then(( c ) => c.HeroesFormComponent)
    },
    {
        path: 'heroe/detail/:id', //Pantalla para detalle de un heroe,
        loadComponent: () => import('./components/heroes/heroe-detail/heroe-detail.component')
    },
    {
        path: '**', //Ruta inexistente
        component: NotRouteFoundComponent
    }
];
