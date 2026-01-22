import { Routes } from '@angular/router';
import { StartGame } from './pages/start-game/start-game';
import { Menu } from './pages/menu/menu';
import { GameConfig } from './pages/game-config/game-config';
import { LogIn } from './pages/log-in/log-in';
import { Register } from './pages/register/register';
import { SceneDescription } from './pages/scene-description/scene-description';
import { SceneResolver } from './pages/scene-resolver/scene-resolver';
import { SceneMulti } from './pages/scene-multi/scene-multi';

export const routes: Routes = [
    { path: '', component: StartGame },
    { path: 'menu', component: Menu },
    { path: 'game-config', component: GameConfig },
    { path: 'log-in', component: LogIn },
    { path: 'register', component: Register },
    { path: 'scene-multi', component: SceneMulti },
    { path: 'scene-description', component: SceneDescription },
    { path: 'scene-resolver', component: SceneResolver }
];
