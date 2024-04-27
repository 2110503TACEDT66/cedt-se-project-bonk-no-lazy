import { User, Interview, Company, JobPosition } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeInterview = Omit<
  Interview,
  "createdAt" | "interviewDate" | "updatedAt" | "company"
> & {
  createdAt:string;
  interviewDate:string;
  updatedAt:string;
  company: SafeCompany;
}

export type SafeCompany = Omit<
  Company,
  "createdAt" | "updatedAt"
> & {
  createdAt:string,
  updatedAt:string
}

export type SafeJobPosition = Omit<
  JobPosition,
  "createdAt" | "updatedAt"
> & {
  createdAt:string,
  updatedAt:string
}
