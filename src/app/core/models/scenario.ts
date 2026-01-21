import { SceneMulti } from "../../pages/scene-multi/scene-multi";

export interface Scenario {
    idScenario:number;
    background:string;
    name:string;
    description:string;
    firstScene:SceneMulti; // Number ? 
}
