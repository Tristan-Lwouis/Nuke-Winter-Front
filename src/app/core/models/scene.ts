
import { TypeSceneEnum } from './enums/TypeSceneEnum';
import { Response } from './response';

export interface Scene {
  idScene: string;
  background: string;
  audio:string;
  description: string;
  question: string;
  responses: Array<Response>;
  typeScene: TypeSceneEnum;
}
