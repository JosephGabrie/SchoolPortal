// See https://svelte.dev/docs/kit/types#app.d.ts

import type { CalendarDate } from "@internationalized/date"

// for information about these interfaces
type User = {
  id: number
  email: string
  role: string
}
declare global {
  namespace App {
    interface Locals {
      user: User | null
    }
    interface classRoom {
      name: string;
      teacher: Teacher;
      subject: string;
      roomNumber: number;
      classSize: number;

    }

    interface Teacher {
      name: string;

    }
    interface Assignment {
      name: string;
      subject: string;
      classSize: number;
    }
    interface Info extends Assignment {
      dueDate: CalendarDate;
      submissionRate: number;
    }
    interface Availability extends Assignment {

      roomNumber: number;
      availability: Time;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
