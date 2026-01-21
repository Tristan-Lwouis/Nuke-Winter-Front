import { Scene } from "../../pages/scene-multi/scene-multi";

export interface Scenario {
    idScenario:number;
    background:string;
    name:string;
    description:string;
    firstScene:Scene; // Number ? 
}
