import { Routes } from '@angular/router';
import { StartGame } from './pages/start-game/start-game';
import { Menu } from './pages/menu/menu';

export const routes: Routes = [
    { path: '', component: StartGame },
    { path: 'menu', component: Menu }
];
