import { Routes } from '@angular/router';
import { StartGame } from './pages/start-game/start-game';
import { Menu } from './pages/menu/menu';
import { GameConfig } from './pages/game-config/game-config';
import { LogIn } from './pages/log-in/log-in';
import { Register } from './pages/register/register';
import { ScenarioImport } from './pages/scenario-import/scenario-import';
import { GameComponent } from './pages/game-component/game-component';

export const routes: Routes = [
    { path: '', component: StartGame },
    { path: 'menu', component: Menu },
    { path: 'game-config', component: GameConfig },
    { path: 'log-in', component: LogIn },
    { path: 'register', component: Register },
    { path: 'scenario-import', component: ScenarioImport },
    { path: 'game-component', component: GameComponent }
];
