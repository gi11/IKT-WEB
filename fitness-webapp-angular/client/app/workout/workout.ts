import { Exercise } from "../exercise/exercise";

export class Workout {
  _id: string;
  _userId: string;
  description: string;
  name: string;
  exercises: Array<Exercise>;
}
