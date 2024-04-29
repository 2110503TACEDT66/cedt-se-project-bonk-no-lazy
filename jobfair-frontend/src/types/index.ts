import { User, Interview, Company, JobPosition, Review } from "@prisma/client";

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
  createdAt: string;
  interviewDate: string;
  updatedAt: string;
  company: SafeCompany;
};

export type SafeCompany = Omit<Company, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeJobPosition = Omit<
  JobPosition,
  "createdAt" | "updatedAt" | "company"
> & {
  createdAt: string;
  updatedAt: string;
  company: SafeCompany;
};

export type SafeReview = Omit<
  Review,
  "createdAt" | "updatedAt" | "company" | "user"
> & {
  createdAt: string;
  updatedAt: string;
  company: SafeCompany;
  user: SafeUser;
};
