import { SceneMulti } from "../../pages/scene-multi/scene-multi";

export interface Scenario {
  //id: number;
  background: string; // String ?
  name: string;
  description: string;
  firstSceneId: SceneMulti; // Number ?
  // firstSceneId: number; // Number ?
}
