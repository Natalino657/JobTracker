import { Application } from "@/types/application";

export let applications: Application[] = [];

export function deleteApplication(id: string) {
  applications = applications.filter((application) => application.id !== id);
}
