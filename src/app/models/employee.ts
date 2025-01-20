import { Course } from './course';

export interface Employee {
  _id?: string;
  username: string;
  password: string;
  name: string;
  startDate: string;
  role: string;
  image?: string;
  courses: Course[];
}
