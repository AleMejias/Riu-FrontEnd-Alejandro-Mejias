import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {
        path: 'heroes', //Listado de heroes
        loadComponent: () => import('./components/heroes/heroes.component')
    },
    {
        path: 'heroe/create', //Listado de heroes
        loadComponent: () => import('./shared/components/heroes-form/heroes-form.component')
    },
    {
        path: 'heroe/edit/:id',
        loadComponent: () => import('./shared/components/heroes-form/heroes-form.component')
         //Pantalla para edicion de un heroe
    },
    {
        path: 'heroe/detail/:id', //Pantalla para detalle de un heroe,
        loadComponent: () => import('./components/heroes/heroe-detail/heroe-detail.component')
    },
    // {
    //     path: '**', //Ruta inexistente
    // }
];
