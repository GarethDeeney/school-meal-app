import { CourseProvider } from './course-provider';

export interface Course {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  image: string;
  courseProvider?: CourseProvider;
  role: string;
  duration: string;
  achieved: boolean;
}
