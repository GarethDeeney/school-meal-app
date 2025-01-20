import { Course } from "./course";

export interface CourseProvider {
    _id?: string,
    name: string;
    courses?: Course[]
}