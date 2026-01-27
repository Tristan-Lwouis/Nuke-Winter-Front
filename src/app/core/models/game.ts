import { Account } from "./account";
import { Avatar } from "./avatar";
import { GameStatusEnum } from "./enums/gameStatusEnum";
import { Scenario } from "./scenario";
import { Scene } from "./scene";


export interface Game {
    idGame: number;
    account:Account;
    avatar:Avatar;
    scenario:Scenario;
    health : number;
    currentScene : Scene;
    status:GameStatusEnum;
    // nbTry : int (calculable);
    // nbSucces : int (calculable);
}

