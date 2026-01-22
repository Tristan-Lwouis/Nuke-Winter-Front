import { Scene } from './scene';

export interface SceneMulti extends Scene {
  isQuestionResponseDisplayed: boolean;
  displayedDescription: string;
  speed: number;
  index: number;
}