import { Application, ApplicationStatus } from "@/types/application";

export let applications: Application[] = [];

export function deleteApplication(id: string) {
  applications = applications.filter((application) => application.id !== id);
}

export function updateApplication(id: string, status: ApplicationStatus) {
  applications = applications.map((application) => {
    if (application.id !== id) {
      return application;
    }

    return {
      ...application,
      status: status,
    };
  });
}
