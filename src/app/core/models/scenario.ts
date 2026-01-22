import { Scene } from "./scene";

export interface Scenario {
  idScenario: number;
  name: string;
  background: string;
  description: string;
  firstScene: Scene;
}
