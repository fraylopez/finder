import { MotherCreator } from './MotherCreator';

export class WordMother {
  static random(numWords: number = 1): string {
    return MotherCreator.random().lorem.words(numWords);
  }
}
