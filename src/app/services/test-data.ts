import { Course } from '../models/course';
import { Employee } from '../models/employee';

export const testStaff: Employee[] = [
  {
    _id: 'd0043f2b-a79e-4102-9699-113a1ae1e94b',
    id: 'd0043f2b-a79e-4102-9699-113a1ae1e94b',
    username: 'aprilbatham',
    password: 'password',
    name: 'April Batham',
    role: 'Accountant',
    startDate: '09/11/2021',
    courses: [],
  },
  {
    _id: 'cb1bc135-cbf5-4e5e-beb4-c8f48d7334af',
    id: 'cb1bc135-cbf5-4e5e-beb4-c8f48d7334af',
    username: 'shaylynnscutchings',
    password: 'password',
    name: 'Shaylynn Scutchings',
    role: 'Accountant',
    startDate: '04/26/2022',
    courses: [
      {
        id: '481f43d3-6893-4c9d-bdfb-5b3bb89d99fe',
        name: 'General Course 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: '../../../assets/general.jpg',
        courseProvider: {
          _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
          name: 'General Course Provider',
        },
        duration: '3 hours',
        role: 'General',
        achieved: false,
      },
    ],
  },
];

export const testCourses: Course[] = [
  {
    _id: '481f43d3-6893-4c9d-bdfb-5b3bb89d99fe',
    name: 'General Course 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'General Course Provider',
    },
    duration: '3 hours',
    role: 'General',
    achieved: false,
  },
  {
    _id: '481f43d3-6893-4c9d-bdfb-5b3bb89d99fe',
    name: 'General Course 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'General Course Provider',
    },
    duration: '20 mins',
    role: 'General',
    achieved: false,
  },
];

const otherCourses: Course[] = [
  {
    id: '481f43d3-6893-4c9d-bdfb-5b3bb89d99fe',
    name: 'General Course 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'General Course Provider',
    },
    duration: '3 hours',
    role: 'General',
    achieved: false,
  },
  {
    id: '481f43d3-6893-4c9d-bdfb-5b3bb89d99fe',
    name: 'General Course 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'General Course Provider',
    },
    duration: '20 mins',
    role: 'General',
    achieved: false,
  },
  {
    id: '5220b2bf-cc07-4dfe-aa6e-67517036407c',
    name: 'General Course 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'General Course Provider',
    },
    role: 'General',
    duration: '25 mins',
    achieved: false,
  },
  {
    id: '85f01519-5bbf-4539-ba53-b9a0d05c00cb',
    name: 'General Course 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'General Course Provider',
    },
    role: 'General',
    duration: '1 hour',
    achieved: false,
  },
  {
    id: 'a2ba8259-1d55-4d82-a6f8-38ca47f73730',
    name: 'IT course 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/software.jpg',
    courseProvider: {
      _id: '0d6e0e26-3b09-4cf3-8718-aad1d9707ed0',
      name: 'IT Course Provider',
    },
    role: 'IT',
    duration: '30 mins',
    achieved: false,
  },
  {
    id: 'c9302301-299b-47f8-ba27-b0b01428e88c',
    name: 'IT Course 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/software.jpg',
    courseProvider: {
      _id: '0d6e0e26-3b09-4cf3-8718-aad1d9707ed0',
      name: 'IT Course Provider',
    },
    role: 'IT',
    duration: '40 mins',
    achieved: false,
  },
  {
    id: '8d2486ca-a104-4e87-881a-6460f24f064e',
    name: 'IT Course 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/software.jpg',
    courseProvider: {
      _id: '0d6e0e26-3b09-4cf3-8718-aad1d9707ed0',
      name: 'IT Course Provider',
    },
    role: 'IT',
    duration: '45 mins',
    achieved: false,
  },
  {
    id: '8d2486ca-a104-4e87-881a-6460f24f064e',
    name: 'IT Course 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/software.jpg',
    courseProvider: {
      _id: '0d6e0e26-3b09-4cf3-8718-aad1d9707ed0',
      name: 'IT Course Provider',
    },
    role: 'IT',
    duration: '45 mins',
    achieved: false,
  },
  {
    id: '481f43d3-6893-4c9d-bdfb-5b3bb89d99fe',
    name: 'Accounting Course 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/general.jpg',
    courseProvider: {
      _id: 'ccff2187-b7d8-4837-bccd-ec6d15e02f69',
      name: 'Accounting Course Provider',
    },
    duration: '3 hours',
    role: 'Accountant',
    achieved: false,
  },
  {
    id: '91e16a7b-381b-461e-a532-6c20ceb73fe1',
    name: 'Accounting Course 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/accounting.jpg',
    courseProvider: {
      _id: 'd7ac3cf1-e5f9-4efb-a451-d66a293c5b52',
      name: 'Accounting Course Provider',
    },
    role: 'Acountant',
    duration: '3 hour',
    achieved: false,
  },
  {
    id: '85d163c9-8c62-42a2-beb2-dfca90ca173a',
    name: 'Accounting Course 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/accounting.jpg',
    courseProvider: {
      _id: 'd7ac3cf1-e5f9-4efb-a451-d66a293c5b52',
      name: 'Accounting Course Provider',
    },
    role: 'Accountant',
    duration: '3 hour',
    achieved: false,
  },
  {
    id: 'ba67ef3a-0efb-4bdd-8235-69672da587b3',
    name: 'HR Course 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '../../../assets/hr.jpg',
    courseProvider: {
      _id: 'b3cbb88f-f460-4f83-a4bf-44f261eabee8',
      name: 'HR Course Provider',
    },
    role: 'HR',
    duration: '3 hour',
    achieved: false,
  },
];
