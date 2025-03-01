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
    // {
    //     path: 'heroe/edit/:id' //Pantalla para edicion de un heroe
    // },
    // {
    //     path: 'heroe/detail/:id' //Pantalla para detalle de un heroe
    // },
    // {
    //     path: '**', //Ruta inexistente
    // }
];
