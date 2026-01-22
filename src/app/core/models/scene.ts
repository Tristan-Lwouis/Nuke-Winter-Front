import { Response } from "./response";
import { TypeScene } from "./TypeScene";

export interface Scene {
    idScene:string;
    background:string;
    //music:string; //v2
    description:string;
    question:string;
    responses:Array<Response>;
    type:TypeScene;
}