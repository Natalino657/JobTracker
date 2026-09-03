export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Technical Interview"
  | "Offer"
  | "Rejected";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes?: string;
  createdAt: string;
};
