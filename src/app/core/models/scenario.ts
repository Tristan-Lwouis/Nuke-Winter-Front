import { SceneMulti } from "../../pages/scene-multi/scene-multi";
import { Scene } from "./scene";

export interface Scenario {
  idScenario: number;
  background: string; // String ?
  name: string;
  description: string;
  firstSceneId: Scene; // Number ?
  // firstSceneId: number; // Number ?
}
