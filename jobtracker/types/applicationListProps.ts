import { Application } from "./application";
export type ApplicationListProps = {
  applications: Application[];
  applicationToDelete: (id: string) => void;
  onAdvanceStatus: (id: string) => void;
  selectedStatus: "All" | Application["status"];
  searchTerm: string;
};
