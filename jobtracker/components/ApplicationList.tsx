"use client";
import { useEffect, useState } from "react";
import { Application } from "@/types/application";

// type Application = {
//   id: string;
//   company: string;
//   role: string;
//   notes: string;
// };

type ApplicationListProps = {
  applications: Application[];
};

export default function ApplicationList({
  applications,
}: ApplicationListProps) {
  //const [applications, setApplications] = useState<Application[]>([]);

  // useEffect(() => {
  //   fetch("/api/applications")
  //     .then((res) => res.json())
  //     .then((data) => setApplications(data));
  // }, []);

  return (
    <div>
      <h2>Candidaturas</h2>

      {applications.map((application: Application) => (
        <div key={application.id}>
          <h3>{application.company}</h3>
          <p>{application.role}</p>
          <p>{application.notes}</p>
        </div>
      ))}
    </div>
  );
}
