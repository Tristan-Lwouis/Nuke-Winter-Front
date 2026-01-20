import { Account } from "./account";

//Game incomplet pour le moment, c'était pour avoir les points de vie
export interface Game {
id:number;
account:Account;

health : number;

nbTry : number;
nbSucces : number;

}
