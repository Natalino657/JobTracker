import { Application } from "./application";
export type ApplicationListProps = {
  applications: Application[];
  applicationToDelete: (id: string) => void;
};
