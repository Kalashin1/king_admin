import { DocumentData } from "firebase/firestore";

export interface User extends DocumentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  thumbnail: string;
  accountType: USER_TYPE;
  courses: CoursePayload[];
}

export type USER_TYPE = "student" | "professional" | "admin";

export type CoursePayload = Pick<
  Course,
  "id" | "description" | "title" | "thumbnail" | "price"
>;

export const COURSE_STATUS = [
  "CREATED",
  "ACCEPTED",
  "APPROVED",
  "PAUSED",
  "ARCHIVED",
] as const;

export type UserPayload = Pick<
  User,
  "id" | "email" | "phone" | "thumbnail" | "name" | "accountType"
>;

export type PlanPayload = Pick<
  Plan,
  "id" | "title" | "description" | "price" | "thumbnail"
>;

export interface Course extends DocumentData {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  students: UserPayload[];
  files: string[];
  createdFor: Array<"student" | "professional">;
  status: (typeof COURSE_STATUS)[number];
}

export type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  files: string[];
  status: (typeof COURSE_STATUS)[number];
} & DocumentData;

export type OrderPayload = Pick<Order, "id" | "amount">;

export type Order = {
  products: Array<PlanPayload | CoursePayload>;
  id: string;
  createdAt: number;
  updatedAt: number;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  user: Pick<User, "id" | "name" | "email">;
} & DocumentData;

export type InvoicePayload = Pick<Invoice, "id" | "order">;

export type Invoice = {
  id: string;
  user: Pick<User, "name" | "id" | "phone">;
  createdAt: number;
  updatedAt: number;
  status: "ACCEPTED" | "BILLED" | "CREATED" | "REJECTED" | "CANCELED";
  order: OrderPayload;
} & DocumentData;

export function addDaysToDate(date: Date, daysToAdd: number): Date {
  const newDate = new Date(date.getTime()); // Create a copy to avoid modifying original
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
}
