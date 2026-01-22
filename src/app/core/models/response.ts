import { Scene } from "./scene";

export interface Response {
    idResponse:string;
    name:string;
    nextScene:Scene;
    damage:number;
}
